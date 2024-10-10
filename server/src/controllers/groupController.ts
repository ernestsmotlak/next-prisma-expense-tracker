import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { error, group } from "console";

const prisma = new PrismaClient();

export const createGroup = async (req: Request, res: Response) => {
    const { creatorId } = req.params;
    const { groupName, participants } = req.body;

    try {
        const creatorId2 = Number(creatorId);

        if (isNaN(creatorId2)) {
            return res.status(400).json({ error: "Invalid creatorId!" });
        }

        if (!groupName || !participants || participants.trim() === "") {
            return res
                .status(400)
                .json({
                    error: "Group name and/or participants can't be empty!",
                });
        }

        // Check if the creator exists
        const creator = await prisma.user.findUnique({
            where: { id: creatorId2 },
        });

        if (!creator) {
            return res.status(400).json({ error: "Creator not found!" });
        }

        // Split participants string into an array and trim whitespace
        const participantUsernames = participants
            .split(",")
            .map((username: string) => username.trim());

        // Fetch user IDs for the given usernames
        const users = await prisma.user.findMany({
            where: {
                username: {
                    in: participantUsernames,
                },
            },
            select: {
                id: true,
            },
        });

        // Extract user IDs from fetched users
        const participantIds = users.map((user) => user.id);

        // Check if any usernames did not match any user
        if (participantIds.length !== participantUsernames.length) {
            return res
                .status(400)
                .json({ error: "One or more participants not found!" });
        }

        const addGroup = await prisma.group.create({
            data: {
                name: groupName,
                creator: {
                    connect: {
                        id: creatorId2,
                    },
                },
                participants: {
                    connect: participantIds.map((id) => ({ id })),
                },
            },
        });

        res.status(200).json({ addGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred!" });
    }
};

export const showGroup = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const groupIdNumber = Number(groupId);

    try {
        const groupData = await prisma.group.findUnique({
            where: {
                id: groupIdNumber,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                expenses: {
                    select: {
                        id: true,
                        amountPaid: true,
                        paidFor: true,
                        expenseName: true,
                        paidBy: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        });

        if (!groupData) {
            return res.status(404).json({ error: "Group not found" });
        }

        res.status(200).json(groupData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred!" });
    }
};

export const showAllGroups = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userIdNumber = Number(userId);

    try {
        if (req.user?.id !== userIdNumber) {
            return res.status(403).json({
                message: "You do not have permission to see this data! ",
            });
        }

        if (isNaN(userIdNumber)) {
            return res.status(400).json({ error: "Invalid userId!" });
        }

        // Fetch groups where the user is either the creator or a participant
        const groups = await prisma.group.findMany({
            where: {
                OR: [
                    { creatorId: userIdNumber },
                    {
                        participants: {
                            some: { id: userIdNumber },
                        },
                    },
                ],
            },
            include: {
                participants: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                creator: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                // expenses: {
                //   select: {
                //     id: true,
                //     amountPaid: true,
                //     paidFor: true,
                //     expenseName: true,
                //     paidBy: {
                //       select: {
                //         id: true,
                //         username: true,
                //       },
                //     },
                //   },
                // },
            },
        });

        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred!" });
    }
};

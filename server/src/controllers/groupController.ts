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

    if (groupName === "" || participants === "") {
      return res
        .status(400)
        .json({ error: "Group name and/or patricipants can't be empty!" });
    }

    const addGroup = await prisma.group.create({
      data: {
        name: groupName,
        participants: participants,
        creator: {
          connect: {
            id: creatorId2,
          },
        },
      },
    });

    res.status(200).json({ addGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occured!" });
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
              some: { id: userIdNumber }
            }
          }
        ]
      },
      include: {
        participants: true,
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

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred!" });
  }
};

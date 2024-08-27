import Head from 'next/head';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>About Us</title>
      </Head>
      <main className="text-center p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-700">
          Welcome to our Next.js application! We're excited to have you here.
        </p>
      </main>
      <footer className="mt-auto p-4 bg-white w-full text-center border-t">
        <p className="text-sm text-gray-600">© 2024 Your Company Name</p>
      </footer>
    </div>
  );
}

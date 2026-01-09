import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Drink it!?",
	description: "A recommendation app for beverages",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ja'>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
				<link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet" ></link>
			</head>
			<body className='antialiased'>{children}</body>
		</html>
	);
}

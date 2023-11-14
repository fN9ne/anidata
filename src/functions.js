import CryptoJS from "crypto-js";

export const api = async (method, body = {}, signal) => {
	let headers = {
		"X-Master-Key": "$2b$10$ou1eG5cCVElqaTRE0N33zeHeGocpZk0H0e0.5jO4GeIVd2vaN.5zq",
		"X-Access-Key": "$2b$10$Yet/6G1q6JkV8tA48ACv/OF/eXoS9XpX8uCCK1/38M3MjqcviVUz.",
	};

	if (method === "PUT") {
		headers["Content-Type"] = "application/json";
	}

	let options = {
		method: method,
		headers: headers,
	};

	if (signal !== undefined) {
		options["signal"] = signal;
	}

	if (method === "PUT") {
		options["body"] = JSON.stringify(body);
	}

	const response = await fetch(
		`https://api.jsonbin.io/v3/b/64fe534a8d92e126ae6a12f7${method === "GET" ? "/latest" : ""}`,
		options
	);
	return await response.json();
};

export const anidb = async ({ search, genres, type, status, page = 1 }) => {
	return await fetch(
		`https://api.jikan.moe/v4/anime
		?q=${search}
		&page=${page}
		&sort=desc
		&limit=24
		&order_by=scored_by
		${genres ? `&genres=${genres.join(",")}` : ""}
		${type ? `&type=${type}` : ""}
		${status ? `&status=${status}` : ""}`
	).then((response) => response.json());
};

export const getAnime = async (id) => {
	return await fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then((response) => response.json());
};

export const test = async (string) => {
	return await fetch(`https://api.jikan.moe/v4/${string}`).then((response) => response.json());
};

export const genres = (genre) => {
	const genres = {
		Shounen: 27,
		Action: 1,
		Adventure: 2,
		Comedy: 4,
		Mythology: 6,
		Mystery: 7,
		Hentai: 12,
		Drama: 8,
		Ecchi: 9,
		Fantasy: 10,
		"Video Game": 79,
		Historical: 13,
		Delinquents: 55,
		Horror: 14,
		"Time Travel": 78,
		Gore: 58,
		Mecha: 18,
		Music: 19,
		Suspense: 41,
		Parody: 20,
		"Super Power": 31,
		"Award Winning": 46,
		Psychological: 40,
		Vampire: 32,
		Samurai: 21,
		Detective: 39,
		Romance: 22,
		"Avant Garde": 5,
		Supernatural: 37,
		Reincarnation: 72,
		"Organized Crime": 68,
		School: 23,
		"Sci-Fi": 24,
		Shoujo: 25,
		"Girls Love": 26,
		Anthropomorphic: 51,
		"Boys Love": 28,
		Space: 29,
		Sports: 30,
		"Strategy Game": 11,
		Harem: 35,
		Kids: 15,
		"Slice of Life": 36,
		Military: 38,
		Seinen: 42,
		"Martial Arts": 17,
		Josei: 43,
		Gourmet: 47,
		Workplace: 48,
		Erotica: 49,
		"Adult Cast": 50,
		CGDCT: 52,
		Childcare: 53,
		Racing: 3,
		"Combat Sports": 54,
		Educational: 56,
		"Gag Humor": 57,
		"High Stakes Game": 59,
		"Idols (Female)": 60,
		"Idols (Male)": 61,
		Isekai: 62,
		Iyashikei: 63,
		"Love Polygon": 64,
		"Magical Sex Shift": 65,
		"Mahou Shoujo": 66,
		Medical: 67,
		"Otaku Culture": 69,
		"Performing Arts": 70,
		Pets: 71,
		"Reverse Harem": 73,
		"Romantic Subtext": 74,
		Showbiz: 75,
		Survival: 76,
		"Team Sports": 77,
		"Visual Arts": 80,
		Crossdressing: 81,
	};
	return genre ? genres[genre] : Object.keys(genres);
};

export const status = (status) => {
	const statuses = {
		Finished: "complete",
		Ongoing: "airing",
		Upcoming: "upcoming",
	};
	return status === undefined ? Object.keys(statuses) : status === "" ? "" : statuses[status];
};

export const types = () => {
	return ["TV", "OVA", "Movie", "Special", "ONA", "Music"];
};

export const hashString = (string) => {
	return CryptoJS.MD5(string) + "";
};

export const months = (monthNumber) => {
	const months = [
		{ name: "January", number: "01" },
		{ name: "February", number: "02" },
		{ name: "March", number: "03" },
		{ name: "April", number: "04" },
		{ name: "May", number: "05" },
		{ name: "June", number: "06" },
		{ name: "July", number: "07" },
		{ name: "August", number: "08" },
		{ name: "September", number: "09" },
		{ name: "October", number: "10" },
		{ name: "November", number: "11" },
		{ name: "December", number: "12" },
	];

	return monthNumber
		? months.filter((month) => month.number === (monthNumber < 10 ? "0" + monthNumber : "" + monthNumber))[0].name
		: months;
};

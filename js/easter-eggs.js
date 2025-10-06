document.addEventListener("DOMContentLoaded", function () {
	const targetDate = new Date(2025, 9, 25, 18, 0, 0).getTime();

	const timerElement = document.getElementById("countdown-timer");

	function updateCountdown() {
		const now = new Date().getTime();
		const distance = targetDate - now;

		if (distance <= 0) {
			timerElement.innerHTML = "Artık buluştuk ❤️";
			clearInterval(interval);
			return;
		}

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		timerElement.innerHTML = `
                <span class="time-box">${days}<small>gün</small></span>
                <span class="time-box">${hours}<small>saat</small></span>
                <span class="time-box">${minutes}<small>dk</small></span>
                <span class="time-box">${seconds}<small>sn</small></span>
            `;
	}

	updateCountdown();
	const interval = setInterval(updateCountdown, 1000);
});

const specialDays = [
	{
		day: 4,
		month: 12,
		baseYear: 2022,
		message:
			"hayatımın en güzel yolculuğu başladı. Yıl dönümümüz kutlu olsun aşkım ❤️",
		emojis: ["💖", "❤️", "🌹", "💞"],
	},
	{
		day: 31,
		month: 12,
		message:
			"Yeni bir yıla yine seninle girmek… bundan güzel bir başlangıç olabilir mi? ❤️",
		emojis: ["🎄", "❄️", "🎁"],
	},
	{
		day: 12,
		month: 1,
		message:
			"Bugün senin günün, iyi ki doğdun hayatımın en güzel parçası ❤️",
		emojis: ["🎂", "🎉", "💐", "🎈", "❤️"],
	},
	{
		day: 14,
		month: 2,
		message: "Sevgililer Günümüz kutlu olsun, seni seviyorum ❤️",
		emojis: ["💞", "❤️", "🌹", "💘"],
	},
	{
		day: 8,
		month: 3,
		message:
			"Tüm güzelliğiyle hayatıma anlam katan kadına... Kadınlar Günün kutlu olsun ❤️",
		emojis: ["🌷", "🌸", "🌺", "💖"],
	},
];

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

// find if today matches any special day
const todayEvent = specialDays.find((e) => e.day === day && e.month === month);

if (todayEvent) {
	// determine message
	let text = "";
	if (todayEvent.baseYear) {
		const diff = year - todayEvent.baseYear;
		text = `${diff} yıl önce bugün ${todayEvent.message}`;
	} else {
		text = `${todayEvent.message}`;
	}
	document.getElementById("celebration-text").innerHTML = `
        <h2>${text}</h2>
        <button onclick="closeCelebration()">Kapat</button>
        `;
	document.getElementById("celebration-modal").style.display = "block";

	startFloatingEmojis(todayEvent.emojis);
}

function closeCelebration() {
	document.getElementById("celebration-modal").style.display = "none";
}

function startFloatingEmojis(emojis) {
	setInterval(() => {
		const emoji = document.createElement("div");
		emoji.className = "floating-emoji";
		emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
		emoji.style.left = Math.random() * 100 + "vw";
		emoji.style.fontSize = Math.random() * 24 + 20 + "px";
		emoji.style.animationDuration = Math.random() * 5 + 6 + "s";
		document.body.appendChild(emoji);
		setTimeout(() => emoji.remove(), 10000);
	}, 400);
}

const musicNote = document.getElementById("music-note");
const songModal = document.getElementById("song-modal");

musicNote.addEventListener("click", () => {
	songModal.style.display = "block";
});

function closeSong() {
	songModal.style.display = "none";
}

window.addEventListener("click", (e) => {
	if (e.target === songModal) {
		songModal.style.display = "none";
	}
});

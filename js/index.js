const video = document.querySelector('.vid');

new Vue({
	el: "#app",
	data() {
		return {
			audio: null,
			circleLeft: null,
			barWidth: null,
			duration: null,
			currentTime: null,
			isTimerPlaying: false,
			tracks: [
				{
					name: "Red Line",
					artist: "Anna Yvette",
					cover:
						"https://linkstorage.linkfire.com/medialinks/images/5b85341a-f7e6-494c-bc75-3037c34b0a1c/artwork-440x440.jpg",
					source: "../mp3/Anna Yvette - Red Line.mp3",
					url: "https://www.youtube.com/watch?v=VrDD2GSNs_I",
					favorited: "false"
				},
				{
					name: "Past The Castle Walls",
					artist: "Lil Peep",
					cover:
						"http://ichef.bbci.co.uk/news/976/cpsprodpb/8955/production/_98775153_lilpeepforcherrygettyimages.jpg",
					source:
						"../mp3/Lil_Tracy_Lil_Peep_-_Past_the_Castle_Walls_-_Past_the_Castle_Walls.mp3",
					url: "https://www.youtube.com/watch?v=RhxVEtjjeo8",
					favorited: "true"
				},
				{
					name: "Radio",
					artist: "Rammstein",
					cover:
						"https://upload.wikimedia.org/wikipedia/commons/e/ed/RS_Single_RADIO.jpg",
					source: "../mp3/Rammstein_-_Radio_.mp3",
					url: "https://www.youtube.com/watch?v=z0NfI2NeDHI",
					favorited: "false"
				},
				{
					name: "Relax",
					artist: "Mika",
					cover:
						"https://avatars.yandex.net/get-music-content/49876/5eb19b64.a.9653-1/m1000x1000",
					source: "../mp3/mika-relax.mp3",
					url: "https://www.youtube.com/watch?v=RVmG_d3HKBA",
					favorited: "false"
				},
				{
					name: "Winter",
					artist: "Antonio Vivaldi",
					cover:
						"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vivaldi.jpg/858px-Vivaldi.jpg",
					source:
						"../mp3/antonio-vivaldi-the-four-seasons-winter-violin-concerto-no.-4-in-f-minor-op.-8-no.-4-rv297-i.-allegro-non-molto_(mp3CC.biz).mp3",
					url:
						"https://www.youtube.com/watch?v=NzCL9uLkQSI&list=RDGMEM8h-ASY4B42jYeBhBnqb3-wVMNzCL9uLkQSI&start_radio=1",
					favorited: "true"
				},
				{
					name: "Call Me Maybe",
					artist: "Carly Rae Jepsen",
					cover:
						"https://m.media-amazon.com/images/I/71eZUvY3hjL._SS500_.jpg",
					source: "../mp3/carly-rae-jepsen-call-me-maybe.mp3",
					url: "https://www.youtube.com/watch?v=fWNaR-rxAic",
					favorited: "false"
				},
				{
					name: "Spotlight",
					artist: "Lil Peep",
					cover:
						"https://i.pinimg.com/originals/89/10/66/891066f466a81a69ad9c4273d8182404.jpg",
					source: "../mp3/Lil Peep & Marshmello - Spotlight.mp3",
					url: "https://www.youtube.com/watch?v=7R1N-8SoqcM",
					favorited: "true"
				}
			],
			currentTrack: null,
			currentTrackIndex: 0,
			transitionName: null
		};
	},
	methods: {
		play() {
			if (this.audio.paused) {
				this.audio.play();
				this.audio.volume = "0.05";
				this.isTimerPlaying = true;
				video.play();
			} else {
				this.audio.pause();
				this.isTimerPlaying = false;
				video.pause();
			}
		},
		generateTime() {
			let width = (100 / this.audio.duration) * this.audio.currentTime;
			this.barWidth = width + "%";
			this.circleLeft = width + "%";
			let durmin = Math.floor(this.audio.duration / 60);
			let dursec = Math.floor(this.audio.duration - durmin * 60);
			let curmin = Math.floor(this.audio.currentTime / 60);
			let cursec = Math.floor(this.audio.currentTime - curmin * 60);
			if (durmin < 10) {
				durmin = "0" + durmin;
			}
			if (dursec < 10) {
				dursec = "0" + dursec;
			}
			if (curmin < 10) {
				curmin = "0" + curmin;
			}
			if (cursec < 10) {
				cursec = "0" + cursec;
			}
			this.duration = durmin + ":" + dursec;
			this.currentTime = curmin + ":" + cursec;
		},
		updateBar(x) {
			let progress = this.$refs.progress;
			let maxduration = this.audio.duration;
			let position = x - progress.offsetLeft;
			let percentage = (100 * position) / progress.offsetWidth;
			if (percentage > 100) {
				percentage = 100;
			}
			if (percentage < 0) {
				percentage = 0;
			}
			this.barWidth = percentage + "%";
			this.circleLeft = percentage + "%";
			this.audio.currentTime = (maxduration * percentage) / 100;
			this.audio.play();
		},
		clickProgress(e) {
			this.isTimerPlaying = true;
			this.audio.pause();
			this.updateBar(e.pageX);
		},
		prevTrack() {
			this.transitionName = "scale-in";
			this.isShowCover = false;
			if (this.currentTrackIndex > 0) {
				this.currentTrackIndex--;
			} else {
				this.currentTrackIndex = this.tracks.length - 1;
			}
			this.currentTrack = this.tracks[this.currentTrackIndex];
			this.resetPlayer();
		},
		nextTrack() {
			this.transitionName = "scale-out";
			this.isShowCover = false;
			if (this.currentTrackIndex < this.tracks.length - 1) {
				this.currentTrackIndex++;
			} else {
				this.currentTrackIndex = 0;
			}
			this.currentTrack = this.tracks[this.currentTrackIndex];
			this.resetPlayer();
		},
		resetPlayer() {
			this.barWidth = 0;
			this.circleLeft = 0;
			this.audio.currentTime = 0;
			this.audio.src = this.currentTrack.source;
			setTimeout(() => {
				if (this.isTimerPlaying) {
					this.audio.play();
				} else {
					this.audio.pause();
				}
			}, 300);
		},
		favorite() {
			this.tracks[this.currentTrackIndex].favorited = !this.tracks[
				this.currentTrackIndex
			].favorited;
		}
	},
	created() {
		let vm = this;
		this.currentTrack = this.tracks[0];
		this.audio = new Audio();
		this.audio.src = this.currentTrack.source;
		this.audio.ontimeupdate = function() {
			vm.generateTime();
		};
		this.audio.onloadedmetadata = function() {
			vm.generateTime();
		};
		this.audio.onended = function() {
			vm.nextTrack();
			this.isTimerPlaying = true;
		};

		for (let index = 0; index < this.tracks.length; index++) {
			const element = this.tracks[index];
			let link = document.createElement("link");
			link.rel = "prefetch";
			link.href = element.cover;
			link.as = "image";
			document.head.appendChild(link);
		}
	}
});

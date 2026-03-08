var servicesData,
	brandsData,
	creatorsData,
	moreCreatorsData = [],
	aboutData,
	configData,
	creatorPages = [],
	creatorPageIndex = 0,
	moreCreatorPages = [],
	moreCreatorPageIndex = 0,
	caseStudiesData,
	loadedImages = 0,
	preloadImageArray = [];

$(document).ready(function () {
	$.ajaxSetup({
		cache: false,
	});

	let promises = [];

	promises.push(
		$.get("data/config.csv", "text", function (data) {
			configData = $.csv.toObjects(data);
			configData.map((config) => {
				configData[config.key] = config.value;
			});
			addConfigData(configData);
		})
	);

	// promises.push(
	// 	$.get("data/services.csv", "text", function (data) {
	// 		servicesData = $.csv.toObjects(data);
	// 		servicesData.map((speaker, index) => {
	// 			addServicesData(index, speaker.title, speaker.detail);
	// 		});
	// 	})
	// );

	promises.push(
		$.get("data/case-studies.csv", "text", function (data) {
			caseStudiesData = $.csv.toObjects(data);
			caseStudiesData.map((cs, index) => {
				preloadImageArray.push(
					`assets/images/cs-logos/${cs.brand.toLowerCase()}.svg`
				);
				if (cs.media.includes(",")) {
					let CSMedia = cs.media
						.split(",")
						.map((item) => item.trim());
					for (i in CSMedia) {
						preloadImageArray.push(
							`assets/case-studies-media/${CSMedia[i]}`
						);
					}
				} else {
					preloadImageArray.push(
						`assets/case-studies-media/${cs.media}`
					);
				}
			});
		})
	);

	promises.push(
		$.get("data/brands.csv", "text", function (data) {
			brandsData = $.csv.toObjects(data);
			brandsData = brandsData.filter((item) => item.show == "TRUE");
			brandsData.map((brand, index) => {
				addBrandsData(brand.name, brand.show, index);
				preloadImageArray.push(
					`assets/images/brands-new/colored/${brand.name.toLowerCase()}.png`
				);
			});
		})
	);

	// promises.push(
	// 	$.get("data/exclusive-creators.csv", "text", function (data) {
	// 		creatorsData = $.csv.toObjects(data);
	// 		for (let i = 0; i < creatorsData.length; i++) {
	// 			let page = Math.ceil((i + 1) / 10) - 1;
	// 			if (creatorPages[page] == undefined) creatorPages[page] = [];
	// 			creatorPages[page].push(creatorsData[i]);
	// 		}
	// 		if (creatorsData.length > 10) {
	// 			creatorsData.slice(0, 10).map((creator, index) => {
	// 				addCreatorsData(creator.name, index, true);
	// 			});
	// 		} else {
	// 			creatorsData.map((creator, index) => {
	// 				addCreatorsData(creator.name, index, true);
	// 			});
	// 		}
	// 		creatorBoxInit();
	// 	})
	// );

	// promises.push(
	// 	$.get("data/more-creators.csv", "text", function (data) {
	// 		moreCreatorsData = $.csv.toObjects(data);
	// 		for (let i = 0; i < moreCreatorsData.length; i++) {
	// 			let page = Math.ceil((i + 1) / 10) - 1;
	// 			if (moreCreatorPages[page] == undefined)
	// 				moreCreatorPages[page] = [];
	// 			moreCreatorPages[page].push(moreCreatorsData[i]);
	// 		}
	// 		if (moreCreatorsData.length > 10) {
	// 			moreCreatorsData.slice(0, 10).map((creator, index) => {
	// 				addMoreCreatorsData(
	// 					creator.name,
	// 					creator.image,
	// 					index,
	// 					true
	// 				);
	// 			});
	// 		} else {
	// 			moreCreatorsData.map((creator, index) => {
	// 				addMoreCreatorsData(
	// 					creator.name,
	// 					creator.image,
	// 					index,
	// 					true
	// 				);
	// 			});
	// 		}
	// 		moreCreatorBoxInit();
	// 	})
	// );

	promises.push(
		$.get("data/creators.csv", "text", function (data) {
			creatorsData = $.csv.toObjects(data);
			for (let i = 0; i < creatorsData.length; i++) {
				let page = Math.ceil((i + 1) / 10) - 1;
				if (creatorPages[page] == undefined) creatorPages[page] = [];
				creatorPages[page].push(creatorsData[i]);
			}
			if (creatorsData.length > 10) {
				creatorsData.slice(0, 10).map((creator, index) => {
					addCreatorsData(creator.name, creator.image, index, true);
				});
			} else {
				creatorsData.map((creator, index) => {
					addCreatorsData(creator.name, creator.image, index, true);
				});
			}
			creatorBoxInit();
		})
	);

	promises.push(
		$.get("data/about.csv", "text", function (data) {
			aboutData = $.csv.toObjects(data);
			aboutData.map((content) => {
				addAboutData(content.title, content.detail);
			});
		})
	);

	// let moreCreatorImagesFolder = "assets/images/more-creators";
	// let moreCreatorIndex = 0;

	// $.ajax({
	// 	url: moreCreatorImagesFolder,
	// 	success: function (data) {
	// 		$(data)
	// 			.find("a")
	// 			.attr("href", function (i, val) {
	// 				if (val.match(/\.(jpe?g|png|gif|webp)$/)) {
	// 					moreCreatorsData.push(decodeURI(val));
	// 					// addMoreCreatorsData(decodeURI(val), moreCreatorIndex);
	// 					// moreCreatorIndex++;
	// 				}
	// 			});
	// 		for (let i = 0; i < moreCreatorsData.length; i++) {
	// 			let page = Math.ceil((i + 1) / 10) - 1;
	// 			if (moreCreatorPages[page] == undefined)
	// 				moreCreatorPages[page] = [];
	// 			moreCreatorPages[page].push(moreCreatorsData[i]);
	// 		}
	// 		if (moreCreatorsData.length > 10) {
	// 			moreCreatorsData.slice(0, 10).map((creatorImage, index) => {
	// 				addMoreCreatorsData(creatorImage, index, true);
	// 			});
	// 		} else {
	// 			moreCreatorsData.map((creatorImage, index) => {
	// 				addMoreCreatorsData(creatorImage, index, true);
	// 			});
	// 		}
	// 		moreCreatorBoxInit();
	// 	},
	// });

	Promise.all(promises).then((values) => {
		preloadImages();
	});
});

function addServicesData(index, title, detail) {
	$(`#services-grid`).children().eq(index).children().eq(0).html(title);
	$(`#services-grid`).children().eq(index).children().eq(1).html(detail);
}

function addBrandsData(name, visible, index) {
	if (visible != "TRUE") return;
	if (index < 9)
		$("#brand-logos").append(`
		<img
			src="assets/images//brands-new/colored/${name.toLowerCase()}.png"
			alt="${name} Logo"
			class="brand-logo"
		>
	`);
	if (index < 6)
		$("#brands-cubes").append(`
			<div class="brand-box">
				<img src="assets/images//brands-new/colored/${name.toLowerCase()}.png" alt="${name}" />
			</div>
	`);
}

function addMoreCreatorsData(name, image, index, initial = false) {
	$("#creators-container-2").append(`
		<div class="creator-box-2 hover-pointer-all" index="${index}" ${
		initial ? "" : `style="height:0px;"`
	}>
			<img
				src="assets/images/more-creators/${image}"
				alt="${name}"
				class="creator-img-2"
			/>
			<div class="creator-name-2">${name}</div>
		</div>
	`);
}

function addCreatorsData(name, image, index, initial = false) {
	let imgPath;
	if (image && image.trim() !== "") {
		// If an image name is provided, assume it's in the 'creators' folder
		imgPath = "creators/" + image;
	} else {
		// Fallback to compressed if no image name is provided
		imgPath = "creators/compressed/" + name.toLowerCase() + ".jpg";
	}
	$("#creators-container").append(`
		<div class="creator-box pointer-events-all" index="${index}" ${
		initial ? "" : `style="height:0px;"`
	}>
			<img
				src="assets/images/${imgPath}"
				alt="${name}"
				class="creator-img"
			/>
			<div class="creator-name">${name}</div>
		</div>
	`);
}

function addAboutData(title, detail) {
	$("#about-lc-title").html(title);
	$("#about-lc-detail").html(detail);
}

function addConfigData(data) {
	$("#email-div>a").html(data.email);
	$("#cta-button").html(data.cta);
	$("#email-div>a").attr("href", "mailto:" + data.email);
}

function preloadImages() {
	// console.log(preloadImageArray);
	for (var i = 0; i < preloadImageArray.length; i++) {
		var tempImage = new Image();
		// tempImage.addEventListener("load", trackProgress, true);
		tempImage.src = preloadImageArray[i];
	}
}

// function trackProgress() {
// 	loadedImages++;

// 	if (loadedImages == preloadImageArray.length) {
// 		imagesLoaded();
// 	}
// }

// function imagesLoaded() {
// 	console.log("All images loaded!");
// }

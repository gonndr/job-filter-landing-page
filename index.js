var localData = [];
var sticker = [];
var stickerIndex = 0;
var stickerId = 1;
// Place all job cards

data.forEach(function(item, index) {
  localData[index] = new JobCard(item);
  localData[index].create();
});

// Stickers Event Listener

$(".filter-sticker").click(function() {

  var stickerText = this.innerHTML;
  var check = false;
  for (var i = 0; i < sticker.length; i++) {
    if (sticker[i].text === stickerText) {
      check = true;
      break;
    }
  }
  if (check === false) {
    sticker[stickerIndex] = new Sticker(stickerText, stickerId);
    stickerId++;
    sticker[stickerIndex].create();
    console.log(sticker);
    stickerIndex++;

    filterJobs(sticker);

    $(".filter-sticker-rem:contains(" + stickerText + ")").find(".rem").click(function() {
      $(".filter-sticker-rem:contains(" + stickerText + ")").remove();

      for (var i = 0; i < sticker.length; i++) {
        if (sticker[i].text === stickerText) {
          sticker.splice(i, 1);
          console.log(sticker);
          break;
        }
      }
      filterJobs(sticker);
      stickerIndex--;
      stickerId--;
      if (sticker.length===0) {
        $(".filter").css("display","none");
      }
    });
  }
  if (sticker.length>0) {
    $(".filter").css("display","block");
  }
})

$("a").click(function() {
  $(".filter-sticker-rem:not(#filter-sticker-rem-template)").remove();

  sticker = [];
  stickerIndex = 0;
  stickerId = 1;
  filterJobs(sticker);
  $(".filter").css("display","none");

});


// Top Bar Stickers
function Sticker(stickerText, id) {
  this.id = id;
  this.text = stickerText;
  this.create = function() {
    var topSticker = $("#filter-sticker-rem-template").clone();
    topSticker.removeAttr("id");
    topSticker.find(".filter-box").html(this.text);
    topSticker.css("display", "inline-grid");
    $(".filter-stickers-panel").append(topSticker);
  }

}
// Job Card Objects

function JobCard(obj) {
  this.id = obj.id;
  this.company = obj.company;
  this.logo = obj.logo;
  this.new = obj.new;
  this.featured = obj.featured;
  this.position = obj.position;
  this.role = obj.role;
  this.level = obj.level;
  this.postedAt = obj.postedAt;
  this.contract = obj.contract;
  this.location = obj.location;
  this.languages = obj.languages;
  this.tools = obj.tools;

  this.create = function() {
    var jobCardHTML = $("#job-card-template").clone();
    jobCardHTML.css("display", "grid");
    jobCardHTML.attr('id', 'job-card-' + this.id);
    jobCardHTML.find("img").attr('src', this.logo);
    jobCardHTML.find("h1").text(this.position);
    jobCardHTML.find("h2").text(this.company);

    if (this.new === true) {
      jobCardHTML.find(".new").css("display", "inline-flex");
    }
    if (this.featured === true) {
      jobCardHTML.addClass("job-featured");
      jobCardHTML.find(".featured").css("display", "inline-flex");
    }

    jobCardHTML.find("p").text(this.postedAt + "   •   " + this.contract + "   •   " + this.location);

    var jobSt = $("#job-sticker-template").clone();
    jobSt.removeAttr("id");

    var jobStickerRole = jobSt.clone();
    jobStickerRole.removeAttr("id");
    jobStickerRole.html(this.role);
    jobStickerRole.css("display", "inline-flex");
    jobCardHTML.find(".job-stickers").append(jobStickerRole);

    var jobStickerLevel = jobSt.clone();
    jobStickerLevel.html(this.level);
    jobStickerLevel.css("display", "inline-flex");
    jobCardHTML.find(".job-stickers").append(jobStickerLevel);

    this.languages.forEach(function(i) {
      var jobSticker = jobSt.clone();
      jobSticker.html(i);
      jobSticker.css("display", "inline-flex");
      jobCardHTML.find(".job-stickers").append(jobSticker);
    });

    this.tools.forEach(function(i) {
      var jobSticker = jobSt.clone();
      jobSticker.html(i);
      jobSticker.css("display", "inline-flex");
      jobCardHTML.find(".job-stickers").append(jobSticker);
    });

    $(".rest").append(jobCardHTML); //place
  }
}

// The Great Filter

function filterJobs(stickerArr) {

  console.log("filtered");

  if (stickerArr.length === 0) {

    $(".job-card:not(#job-card-template)").css("display", "grid");

  } else {

    $(".job-card:not(#job-card-template)").css("display", "none");
    var jobCards = $(".job-card:not(#job-card-template)");

    var selectedStickers = getSelectedStickerList (stickerArr);

    for (var i = 0; i < jobCards.length; i++) {
      var stickersJob = getStickerList(jobCards.eq(i));
      var show = arrayContainsAnotherArray(selectedStickers, stickersJob);
      if (show === true) {
        jobCards.eq(i).css("display", "grid");
      }
    }
  }

}

function getSelectedStickerList (stickerList) {
  var stickerArray =[];

  for (var i=0;i<stickerList.length;i++) {
    stickerArray[i] = stickerList[i].text;
  }
stickerArray.sort();
  return stickerArray;
}

function getStickerList(jobCard) {
  // jobCard is a jQuery Object

  var stickerArray = jobCard.find(".filter-sticker").map(function() {
    return $.trim($(this).text());
  }).get();
  stickerArray.splice(0, 1);
  stickerArray.sort(); //ordered alphabetically

  return stickerArray;

}

// If array is contained in another one

function arrayContainsAnotherArray(needle, haystack) {
  for (var i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1)
      return false;
  }
  return true;
}

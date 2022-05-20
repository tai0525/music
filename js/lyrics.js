console.clear();
var _data = JSON.parse(`{"lyrics":[{"line":"","time":-1},{"line":"我真的是快瘋了","note":"Verse 1","time":13000},{"line":"code一直red","time":16000},{"line":"怎麼那麼多要記的","time":19000},{"line":"邏輯在腦裡逼著我","time":22500},{"line":"繼續喝上罐的酒","time":24500},{"line":"拎阿拎 拎阿拎 每個產品都有獨特的id","time":27500},{"line":"一呀一呀一呀一呀唷","time":32000},{"line":"腸胃痛到可能就得去打點滴  yeah","time":36000},{"line":"程式碼記不住 但還是一直想","note":"Verse 2","time":39800},{"line":"一定要撐住 袂當挼目睭","time":43000},{"line":"喔 vue vue vue vue vue","time":46500},{"line":"又是一個煩人bug 找不出 我恨vue","time":49500},{"line":"just wanna say fuck you say fuck you","time":53000},{"line":"hope someday我會 say love you say love you","time":59000},{"line":"just wanna say fuck you say fuck you","time":65500},{"line":"hope someday我會 say love you say love you","time":72000}]}`);
var currentLine = "";

function align() {
   var a = $(".highlighted").height();
   var c = $(".content").height();
   var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
   var e = d + (a/2) - (c/2);
   $(".content").animate(
       {scrollTop: e + "px"}, {easing: "swing", duration: 250}
   );
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
   if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
      lyricHeight = $(".lyrics").height();
      align();
   }
});

$(document).ready(function(){
   $("video").on('timeupdate', function(e){
      var time = this.currentTime*1000;
      var past = _data["lyrics"].filter(function (item) {
         return item.time < time;
      });
      if (_data["lyrics"][past.length] != currentLine) {
         currentLine = _data["lyrics"][past.length];
         $(".lyrics div").removeClass("highlighted");
         $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
         align();
      }
   });
});

generate();

function generate() {
   var html = "";
   for(var i = 0; i < _data["lyrics"].length; i++) {
      html += "<div";
      if(i == 0) {
         html+=` class="highlighted"`;
         currentLine = 0;
      }
      if(_data["lyrics"][i]["note"]) {
         html += ` note="${_data["lyrics"][i]["note"]}"`;
      }
      html += ">";
      html += _data["lyrics"][i]["line"] == "" ? "•" : _data["lyrics"][i]["line"];
      html += "</div>"
   }
   $(".lyrics").html(html);
   align();
}
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script type="text/javascript" src="https://criar.io/js/jquery_app.min.js"></script>
<script type="text/javascript" src="https://criar.io/js/trackers.js"></script>
<!-- Sessiontab -->
<script type="text/javascript">
  (function() { if(typeof window.sessiontab != "undefined") return;
  var s = window.sessiontab = function() { s.api.push(arguments) }, h = document.getElementsByTagName("head")[0], st = document.createElement("script");
  s.api = new Array(); st.type = "text/javascript"; st.async = 1;
  st.src = (location.protocol == 'https:' ? 'https' : 'http') + '://cdn.sessiontab.com/tracking.js?' + new Date().getTime();
  h.appendChild(st); })();
  sessiontab("init", "4579");
</script>
    <script src="https://criar.io/js/jquery.qrcode.min.js"></script>
    <script>
      $(".tabs li").on("click", function(a) {
        var li = $(a.target).parent();
        $(".tabs li").removeClass("is-active");
        li.addClass("is-active");
        $("#url").hide(); $("#vcard").hide(); $("#sms").hide();
        $("#" + li.attr("data-tab")).show();
      });

      $("#submit").on("click", function() {
        var qrcode;

        if ($("[data-tab='vcard']").hasClass("is-active")) {
          qrcode = "BEGIN:VCARD\n";
          qrcode += "VERSION:3.0\n";
          qrcode += "N:" + $("#last_name").val() + ";" + $("#first_name").val() + "\n";
          qrcode += "FN:" + $("#first_name").val() + " " + $("#last_name").val() + "\n";
          qrcode += $("#company").val() ? "ORG:" + $("#company").val() + "\n" : "";
          qrcode += $("#title").val() ? "TITLE:" + $("#title").val() + "\n" : "";
          qrcode += $("#email").val() ? "EMAIL:" + $("#email").val() + "\n" : "";
          qrcode += $("#website").val() ? "URL:" + $("#website").val() + "\n" : "";
          qrcode += $("#cell").val() ? "TEL;TYPE=CELL:" + $("#cell").val() + "\n" : "";
          qrcode += $("#phone").val() ? "TEL;TYPE=WORK:" + $("#phone").val() + "\n" : "";
          qrcode += "END:VCARD";
        }
        else if ($("[data-tab='sms']").hasClass("is-active")) {
          qrcode = "SMSTO:" + $("#sms_phone").val() + ":" + $("#sms_message").val()
        }
        else {
          qrcode = $("#text").val();
        }

        $("#qrcode").html("").qrcode({ size: 500, background: "#FFF", text: qrcode });

        slackNotify("random", "Criar.io Tools", ":gear:", "Gerador de QRCode: " + qrcode, function() {});
      });


      $("#download").on("click", function() {
        slackNotify("random", "Criar.io Tools", ":gear:", "Gerador de QRCode: Download", function() {});

        var link = document.createElement('a');
        link.setAttribute('download', 'QRCode-criar.png');
        link.setAttribute('href', $("canvas")[0].toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click();
      });

      $('#qrcode').qrcode({ size: 500, background: "#FFF", text: "criar.io"});

      function slackNotify(channel, username, emoji, text, callback) {
        var fd = new FormData();
        fd.append("payload", JSON.stringify({ "username": username, "channel": channel, "icon_url": "https://slack.com/img/icons/app-57.png", "icon_emoji": emoji, "text": text }));
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://hooks.slack.com/services/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", true);
        xhr.onload = function() { if (this.status == 200) { callback(this.response); } };
        xhr.send(fd);
      }
    </script>
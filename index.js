$(document).ready(function () {
    $("#copyLink").on("click", function () { navigator.clipboard.writeText($("#whatsAppLink").val()); })

    $("#generateWhatsAppLink").on("submit", function (e) {
        e.preventDefault();

        const phoneNumber = $("#phoneNumber").val();
        const message = $("#message").val();
        const useQRCode = !!$("#useQRCode").attr("checked");

        let link = (!!message)
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
            : `https://api.whatsapp.com/send?phone=${phoneNumber}`;

        $("#whatsAppLink").val(link);

        if (useQRCode) {
            QRCode.toDataURL(link, {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                quality: 0.3,
                margin: 1,
                color: {
                    dark: "#000000",
                    light: "#FFFFFF"
                }
            }, function (err, url) {
                // Initialize QRCode download with <a> 
                const a = document.createElement("a");

                a.href = url;
                a.setAttribute("download", "QRCode.JPEG");
                a.click();
            });
        }
    });

    $("#useQRCode").on("click", function () { $(this).attr("checked", !$(this).attr("checked")); })
});
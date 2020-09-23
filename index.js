$(document).ready(function () {
    $("#copyLinkButton").on("click", function () { navigator.clipboard.writeText($("#linkText").val()); })

    $("#generateLinkForm").on("submit", function (e) {
        e.preventDefault();

        const phoneNumber = $("#phoneNumberText").val();
        const message = $("#messageText").val();
        const useQRCode = !!$("#useQRCodeToggle").attr("checked");

        let link = (!!message)
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
            : `https://api.whatsapp.com/send?phone=${phoneNumber}`;

        $("#linkText").val(link);

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

    $("#useQRCodeToggle").on("click", function () { $(this).attr("checked", !$(this).attr("checked")); })
});
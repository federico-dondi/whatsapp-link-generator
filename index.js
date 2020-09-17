$(document).ready(function () {
    let whatsAppLink = undefined
    let whatsAppQRCode = undefined

    $.get("https://restcountries.eu/rest/v2/all")
        .done(function (data) {
        })
        .fail(function (xhr) {
        });

    $("#copyLink").on("click", function () { navigator.clipboard.writeText(whatsAppLink); })

    $("#generateWhatsAppLink").on("submit", function (e) {
        e.preventDefault();

        let phoneNumber = $("#phoneNumber").val();
        let message = $("#message").val();
        let useQRCode = !!$("#useQRCode").attr("checked");

        $("#resultsBox").removeClass("is-hidden");

        whatsAppLink = (!!message) 
            ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
            : `https://api.whatsapp.com/send?phone=${phoneNumber}`;

        $("#whatsAppLink").val(whatsAppLink);
    });

    $("#useQRCode").on("click", function () { $(this).attr("checked", !$(this).attr("checked")); })
});
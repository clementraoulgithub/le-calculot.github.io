document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        document.body.style.visibility = "visible";
    }
});
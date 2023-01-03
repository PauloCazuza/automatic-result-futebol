const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.placardefutebol.com.br/jogos-de-hoje");

    const info = await page.evaluate(() => {
        function getInnetText(pais) {
            pais = pais.toUpperCase();
            var tagsA = document.getElementsByTagName("a");
            var tagsArray = [...tagsA];
            var jogoDoPais = tagsArray.filter(x => x.href.toUpperCase().includes(pais));
            return jogoDoPais[0].innerText;
        }

        try {
            return getInnetText("Brasil");
        } catch (error) {
            return "Não está acontecendo jogo do brasa";
        }

    });

    console.log(info);

    await browser.close();
})();
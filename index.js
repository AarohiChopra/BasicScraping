const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;


const movies = ["https://www.imdb.com/title/tt0242519/?ref_=tt_sims_tt"];

(async () => {
    let imdbData = []  ;
    const response = await request({
        uri: movie,
        headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
        },
        gzip: true
    });
    let $ = cheerio.load(response)
    let Title = $('div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt shortenTop ratingBarHidden"] > h1').text();
    let Rating = $('div[data-testid="hero-rating-bar__aggregate-rating__score"] > span').text()[0];
    let Summary = $('span[data-testid="plot-xs_to_m"]').text();
    // We can also use 
    /*
    $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-kvkd64-2.kmTkgc > div.Hero__ContentContainer-kvkd64-10.eaUohq.hero_fitContent_ratingBelow > div.Hero__MetaContainer__Video-kvkd64-4.kNqsIK > div.GenresAndPlot__ContentParent-cum89p-12.kqlJct.Hero__GenresAndPlotContainer-kvkd64-11.twqaW > p > span.GenresAndPlot__TextContainerBreakpointXS_TO_M-cum89p-0.dcFkRD').innerText
    */
    // by selecting the element, right clicking copy < copy selector 
    let ReleaseDate = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(42) > div.styles__MetaDataContainer-sc-12uhu9s-0.cgqHBf > ul > li:nth-child(1) > div > ul > li > a').text();

    imdbData.push({
        Title, 
        Rating, 
        Summary, 
        ReleaseDate,
    });
    const j2cp = new json2csv();
    const csv = j2cp.parse(imdbData)
    fs.writeFileSync("./imdb.csv", csv, "utf-8");
}

)();


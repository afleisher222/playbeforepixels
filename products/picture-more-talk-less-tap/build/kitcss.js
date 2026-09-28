// CSS for the printable kit. DIM = { w, h } in CSS units.
module.exports = (DIM) => {
  const C = require('../story-bonus/build/art.js').C;
  return `
@page { size: ${DIM.w} ${DIM.h}; margin: 0 }
* { box-sizing: border-box }
html, body { margin: 0; padding: 0; background: #fff }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: "Nunito Sans", sans-serif; color: ${C.ink} }
.page { width: ${DIM.w}; height: ${DIM.h}; padding: 0.5in; position: relative; overflow: hidden; display: flex; flex-direction: column; break-after: page; page-break-after: always }
.page:last-child { break-after: auto; page-break-after: auto }
.body { flex: 1; min-height: 0; display: flex; flex-direction: column }
.foot { height: 22px; flex: none; margin-top: 8px; border-top: 1.5px solid ${C.wash}; padding-top: 5px; display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 8.5px; color: rgba(29,41,64,.72) }
.foot .fl { display: flex; align-items: center; gap: 8px; font-weight: 700 } .foot .fmid { text-align: center; flex: 1 }
.foot .fr { display: flex; align-items: center; gap: 8px; min-width: 16px; text-align: right } .foot .fr em { font-style: normal; font-weight: 600; font-size: 8px; white-space: nowrap } .foot .fr b { font-weight: 800; font-size: 10px }
.logo { display: block; width: auto }
p { margin: 0 0 .5em } ul, ol { margin: 0; padding-left: 1.2em }
.h { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 34px; line-height: 1.04; letter-spacing: -.6px; margin: 0 0 10px }
.h2 { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 25px; line-height: 1.05; letter-spacing: -.4px; margin: 0 0 3px }
.h3 { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 6px; line-height: 1.1 }
h4 { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 15px; margin: 0 0 5px }
.muted { opacity: .55; font-weight: 700 }
.lead { font-size: 14px; line-height: 1.45; margin: 0 0 12px }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 22px } .two.tight { gap: 18px; margin-top: 12px }
.three { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px }
.pill { display: inline-block; padding: 6px 14px; border-radius: 999px; font-weight: 800; font-size: 13px }
.chip { display: inline-flex; align-items: center; justify-content: center; border-radius: 9px; flex: none }
.fbox { border: 2.5px dashed ${C.tomato}; border-radius: 10px; padding: 10px 14px; font-size: 12px; line-height: 1.4; background: #fff }
.fbox b { color: ${C.tomato}; font-weight: 800 }
.small { font-size: 11px; line-height: 1.45 } ul.small li { margin-bottom: 2px }
.blank { display: inline-block; min-width: 70px; border-bottom: 2px solid ${C.ink}; height: 1.05em; vertical-align: baseline }
.blank.wide { min-width: 150px } .blank.wide2 { min-width: 300px }
.tinynote { font-size: 11.5px; line-height: 1.4; opacity: .8; margin-top: 10px }

/* cover */
.cov { display: flex; flex-direction: column; height: 100% }
.covtop { display: flex; align-items: center; justify-content: space-between }
.covkick { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; color: ${C.tomato} }
.covtitle { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 104px; line-height: .95; letter-spacing: -1.5px; margin: 34px 0 6px; color: ${C.ink} }
.covsub { font-size: 22px; font-weight: 800; margin: 0 0 16px }
.covwords { display: flex; gap: 10px; margin: 0 }
.covwords span { display: inline-flex; align-items: center; gap: 4px; padding: 5px 15px 5px 8px; border-radius: 14px; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 22px }
.covart { flex: 1; min-height: 0; margin: 12px 0 4px }
.covmeta { display: flex; gap: 10px; margin-bottom: 12px }
.covinside { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px }
.covinside div { background: ${C.wash}; border-radius: 12px; padding: 9px 6px 8px; text-align: center; font-size: 11.5px; font-weight: 700; line-height: 1.2 }
.covinside b { display: block; font-family: "Bricolage Grotesque", sans-serif; font-size: 21px; font-weight: 800; color: ${C.tomato}; margin-bottom: 2px }

/* inside */
.toc { list-style: none; padding: 0; margin: 0 0 16px; font-size: 14px }
.toc li { display: flex; align-items: baseline; gap: 6px; padding: 5px 0; border-bottom: 1px solid ${C.wash} }
.toc li i { flex: 1 } .toc li b { font-family: "Bricolage Grotesque", sans-serif; color: ${C.tomato}; min-width: 20px; text-align: right }
.files { background: ${C.wash}; border-radius: 14px; padding: 12px 16px; font-size: 12.5px; line-height: 1.45 }
.files li { margin-bottom: 3px }
.steps { font-size: 13.5px; line-height: 1.45; padding-left: 1.3em; margin-bottom: 14px } .steps li { margin-bottom: 6px }
.howbox { background: ${C.tSun}; border-radius: 14px; padding: 14px 16px; font-size: 12.5px; line-height: 1.45 }
.legend { display: grid; gap: 8px; margin-top: 8px } .legend div { display: flex; align-items: center; gap: 10px; font-size: 12.5px }
.fwrap { margin-top: auto; padding-top: 14px } .fnote { background: ${C.wash}; border-radius: 14px; padding: 12px 16px; font-size: 13px; line-height: 1.45 }

/* before you start */
.tip ul { font-size: 13px; line-height: 1.5; margin-bottom: 16px } .tip li { margin-bottom: 6px }
.needbox { margin-top: auto; background: ${C.tSun}; border-radius: 16px; padding: 14px 18px }
.needs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px } .needs div { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 700 }
.week5 { margin-top: 18px } .wk { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px }
.wk div { background: ${C.wash}; border-radius: 12px; padding: 10px 10px; font-size: 12px; line-height: 1.4 } .wk b { display: block; font-family: "Fredoka", sans-serif; font-size: 16px; color: ${C.tomato}; margin-bottom: 3px }
.note { background: ${C.wash}; border-radius: 10px; padding: 10px 12px; font-size: 11px; line-height: 1.4 }

/* script */
.scripthead .meta { font-size: 12.5px; margin: -4px 0 10px }
.do { color: #5B6678; font-style: normal }
.script { display: grid; gap: 9px }
.srow { display: grid; grid-template-columns: 40px 1fr; gap: 12px; align-items: start; background: ${C.wash}; border-radius: 14px; padding: 10px 14px 8px 10px }
.snum { width: 40px; height: 40px; border-radius: 12px; background: ${C.tomato}; color: #fff; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 24px; display: flex; align-items: center; justify-content: center }
.stxt h4 { font-size: 16px; margin: 1px 0 3px } .stxt h4 small { font-family: "Nunito Sans", sans-serif; font-weight: 700; font-size: 11px; opacity: .65; margin-left: 6px }
.stxt p { font-size: 13px; line-height: 1.42; margin: 0 0 3px } .stxt .say { font-size: 14.5px; font-weight: 800 } .stxt .say b { color: ${C.tomato} }
.ifbox { margin-top: 12px; border: 2px solid ${C.sun}; border-radius: 14px; padding: 12px 14px }
.ifs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px } .ifs b { font-size: 12.5px } .ifs p { font-size: 12px; line-height: 1.4; margin: 2px 0 0 }

/* poster */
.poster { display: flex; flex-direction: column; height: 100%; text-align: center }
.pbanner { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 72px; line-height: 1; letter-spacing: -2px; color: #fff; background: ${C.tomato}; border-radius: 22px; padding: 22px 10px 26px }
.pbanner span { font-family: "Caveat", cursive; font-weight: 700; font-size: 60px; letter-spacing: 0; color: ${C.sun}; margin-right: 6px }
.psub { font-size: 16px; font-weight: 700; margin: 12px 0 12px }
.plegend { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left }
.pl { display: flex; align-items: center; gap: 12px; border: 3px solid; border-radius: 16px; padding: 9px 12px }
.pl b { display: block; font-family: "Fredoka", sans-serif; font-size: 22px; line-height: 1 } .pl span { font-size: 13px; font-weight: 700 }
.prules { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 12px 0 0 }
.prules div { background: ${C.wash}; border-radius: 12px; padding: 10px 6px; font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 14px; line-height: 1.15; display: flex; align-items: center; justify-content: center }
.part { flex: 1; min-height: 0; margin-top: 8px }
.pnote { font-family: "Caveat", cursive; font-weight: 700; font-size: 24px; margin: 4px 0 0; color: ${C.tomato} }

/* card pages */
.cardhead { flex: none; margin-bottom: 6px }
.cutnote { font-size: 11.5px; margin: 0; opacity: .85 } .scissor { font-size: 14px; margin-right: 3px }
.grid { display: grid; justify-content: center; align-content: start }
.grid.blocks { grid-template-columns: repeat(2, 3.4in); grid-auto-rows: 2.25in }
.grid.prompts { grid-template-columns: repeat(3, 2.25in); grid-auto-rows: 3in }
.grid.names { grid-template-columns: repeat(2, 3in); grid-auto-rows: .85in }
.cell { outline: 1.2px dashed #9AA6BA; outline-offset: -.6px; padding: .085in; position: relative }
.bcard { height: 100%; border-radius: 18px; display: flex; align-items: center; gap: 10px; padding: 0 18px 0 14px }
.bglyph { flex: none; width: 104px; display: flex; justify-content: center }
.btxt { flex: 1; min-width: 0 }
.blab { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 40px; line-height: 1; letter-spacing: .5px }
.bkid { font-family: "Fredoka", sans-serif; font-weight: 500; font-size: 16px; line-height: 1.2; margin: 6px 0 16px }
.bname { border-bottom: 2px solid; font-size: 10px; font-weight: 700; opacity: .9; padding-bottom: 12px; letter-spacing: .5px }
.nblock { height: 100%; border-radius: 10px; display: flex; align-items: flex-end; padding: 0 12px 12px }
.nblock span { flex: 1; border-bottom: 1.5px solid rgba(29,41,64,.45); font-size: 9px; font-weight: 700; opacity: .7; padding-bottom: 2px }
.pcard { height: 100%; border: 3.5px solid; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; background: #fff }
.pband { display: flex; align-items: center; gap: 8px; padding: 9px 12px; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 20px; letter-spacing: .5px }
.ptxt { flex: 1; display: flex; align-items: center; justify-content: center; text-align: center; padding: 8px 14px; font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 21px; line-height: 1.2 }
.phint { text-align: center; font-size: 10.5px; font-weight: 800; padding: 0 0 10px; letter-spacing: .3px; text-transform: uppercase }
.pcard.topic { border-color: ${C.ink} }
.ticon { flex: 1; display: flex; align-items: center; justify-content: center }
.tlab { text-align: center; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 21px; padding: 0 10px 16px; line-height: 1.1 }

/* whose-turn mat */
.lead { }
.mat { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 44px 1fr; gap: 8px; align-items: stretch }
.matcol { border-radius: 18px; padding: 12px; display: flex; flex-direction: column }
.mathead { display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; padding: 8px; color: #fff; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 20px }
.matcol > p { text-align: center; font-size: 12px; font-weight: 700; margin: 8px 0 }
.matslots { flex: 1; display: grid; grid-auto-rows: 1fr; gap: 6px }
.matslots div { border: 2px dashed rgba(29,41,64,.25); border-radius: 10px; background: rgba(255,255,255,.6) }
.matarrow { display: flex; align-items: center } .matarrow svg { width: 44px; height: 44px }

/* weekly tracker */
.track { width: 100%; border-collapse: collapse; font-size: 11px; flex: none }
.track th { background: ${C.ink}; color: #fff; font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 13px; padding: 5px 4px }
.track th:first-child { border-radius: 8px 0 0 0; width: 26% } .track th:last-child { border-radius: 0 8px 0 0 }
.track td { border: 1px solid #C9D2E0; height: 33px; text-align: center; padding: 0 3px }
.track td i { display: inline-block; width: 15px; height: 13px; border: 2px solid; border-radius: 4px; margin: 0 2px; vertical-align: middle }
.track tr.tot td { font-weight: 800; background: ${C.tSun}; font-size: 10.5px }
.track tr.tot td:first-child { text-align: left; padding-left: 8px }
.tkey { display: flex; align-items: center; gap: 14px; margin-top: 8px; font-size: 11px; font-weight: 700 }
.tkey i { display: inline-block; width: 15px; height: 13px; border: 2px solid; border-radius: 4px; vertical-align: middle }
.tkey .tnote { margin-left: auto; font-weight: 600; font-style: italic; opacity: .75 }

/* star + wobble */
.starpage { flex: 1; min-height: 0; display: grid; grid-template-rows: minmax(0, 1fr) 2.1in; gap: 0 }
.starcell { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: .2in; min-height: 0; overflow: hidden }
.starcell svg { flex: 1; min-height: 0; width: 100%; height: auto }
.starlab { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 28px; margin-top: 4px }
.wobble { display: flex; align-items: center; justify-content: center }
.wobin { display: flex; align-items: center; gap: 22px; background: ${C.tTomato}; border-radius: 20px; padding: 18px 30px; width: 100%; height: 100% }
.wobt { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 46px; color: ${C.tomato}; line-height: 1 }
.wobin p { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 21px; line-height: 1.25; margin: 8px 0 0 }

/* variations */
.vars { display: grid; gap: 16px }
.var { background: ${C.wash}; border-radius: 16px; padding: 18px 20px 16px }
.vhead { display: flex; gap: 12px; align-items: center; margin-bottom: 8px }
.vnum { flex: none; width: 42px; height: 42px; border-radius: 12px; color: #fff; font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 24px; display: flex; align-items: center; justify-content: center }
.vhead h3 { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 24px; margin: 0; line-height: 1.05 }
.vmeta { font-size: 12.5px; margin: 3px 0 0 }
.var ol { font-size: 14.5px; line-height: 1.5; padding-left: 1.3em; margin-bottom: 12px } .var li { margin-bottom: 5px }
.vtips { display: grid; grid-template-columns: 1fr 1fr; gap: 10px } .vtips p { background: #fff; border-radius: 10px; padding: 9px 12px; font-size: 12.5px; line-height: 1.4; margin: 0 }
.vfoot { margin-top: 14px; background: ${C.tSun}; border-radius: 14px; padding: 12px 16px; font-size: 13px; line-height: 1.45 }

/* family */
.famtop { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px }
.famtag { font-family: "Caveat", cursive; font-weight: 700; font-size: 22px; color: ${C.tomato} }
.letter { font-size: 14px; line-height: 1.5 }
.famgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 6px }
.famhow, .famtips { border-radius: 16px; padding: 14px 16px } .famhow { background: ${C.tSky} } .famtips { background: ${C.tGrass} }
.famhow ol, .famtips ul { font-size: 12.5px; line-height: 1.45 } .famhow li, .famtips li { margin-bottom: 5px }
.safe { font-size: 11.5px; line-height: 1.4; margin: 8px 0 0 }
.famfoot { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 20px }
.teacherline { font-size: 14px } .teacherline .line { display: inline-block; width: 220px; border-bottom: 2px solid ${C.ink} } .teacherline small { margin-left: 46px; opacity: .6 }
.famqr { display: flex; align-items: center; gap: 12px; background: ${C.wash}; border-radius: 14px; padding: 10px 14px; font-size: 11px; line-height: 1.4 } .famqr p { margin: 0 }
.famsheet { flex: 1; min-height: 0; display: grid; grid-template-columns: 2.3in 1fr; gap: 20px }
.famtower { min-height: 0 }
.famcards { display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: min-content; gap: 8px; align-content: start }
.fc { display: flex; align-items: center; gap: 8px; border: 2.5px solid; border-radius: 12px; padding: 7px 9px; font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 13.5px; line-height: 1.2; min-height: 54px }
.famdone { grid-column: 1 / -1; background: ${C.tSun}; border-radius: 14px; padding: 14px 16px; margin-top: 6px; font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 18px }
.famdone .fsmall { font-family: "Nunito Sans", sans-serif; font-weight: 600; font-size: 11px; opacity: .8; margin: 6px 0 0 }

/* certificate */
.cert { flex: 1; border: 10px solid ${C.sun}; border-radius: 24px; padding: 10px; display: flex }
.certin { flex: 1; border: 3px dashed ${C.tomato}; border-radius: 14px; padding: 26px 30px 16px; text-align: center; display: flex; flex-direction: column }
.ckick { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 14px; letter-spacing: 3px; text-transform: uppercase; color: ${C.tomato}; margin: 0 0 12px }
.ctitle { font-family: "Bricolage Grotesque", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.02; letter-spacing: -1px; margin: 0 0 22px; text-wrap: balance }
.cbig { display: flex; align-items: baseline; justify-content: center; gap: 14px; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 34px; margin-bottom: 20px }
.cline { font-size: 17px; font-weight: 700; margin: 0 0 12px }
.cmsg { font-family: "Fredoka", sans-serif; font-weight: 500; font-size: 18px; line-height: 1.35; max-width: 470px; margin: 8px auto 0 }
.cart { flex: 1; min-height: 0; margin: 8px 0 }
.cbrand { display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 12px; font-weight: 700 }

/* story */
.storygrid { display: grid; grid-template-columns: 2.6in 1fr; gap: 22px; align-items: center; margin-bottom: 18px }
.storycov img { width: 100%; border-radius: 6px; display: block; box-shadow: 0 0 0 1px rgba(29,41,64,.1) }
.storytxt p { font-size: 13.5px; line-height: 1.5 }
.rtips section { background: ${C.wash}; border-radius: 16px; padding: 14px 16px } .rtips ul { font-size: 12.5px; line-height: 1.45 } .rtips li { margin-bottom: 5px }

/* license */
.lic { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 12px; line-height: 1.4 }
.lic th { text-align: left; padding: 9px 10px; font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 15px; background: ${C.tSky} }
.lic th:first-child { background: transparent } .lic th:nth-child(2) { border-radius: 12px 0 0 0 } .lic th:last-child { border-radius: 0 12px 0 0; background: ${C.tGrass} }
.lic th span { font-family: "Bricolage Grotesque", sans-serif; font-size: 20px; color: ${C.tomato} }
.lic td { padding: 8px 10px; border-bottom: 1px solid #DCE3EE; vertical-align: top } .lic td:first-child { font-weight: 800; width: 22% }
.isbn { border: 2px dashed ${C.ink}; border-radius: 8px; padding: 10px 12px; margin-top: 10px; font-size: 11px; display: flex; flex-direction: column; justify-content: center; gap: 4px; width: 2in; height: 1.2in; background: #fff } .isbn span { opacity: .7 }

/* more */
.moretop { display: flex; justify-content: center; margin: 10px 0 24px }
.mores { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin: 8px 0 22px }
.mo { border-radius: 18px; padding: 16px 16px 14px } .mo h3 { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 20px; margin: 12px 0 6px; line-height: 1.1 } .mo p { font-size: 12.5px; line-height: 1.45 }
.motag { color: #fff; font-size: 10.5px; font-weight: 800; padding: 4px 10px; border-radius: 999px; letter-spacing: .3px }
.bonusbox { display: flex; gap: 20px; align-items: center; background: ${C.tSun}; border-radius: 18px; padding: 18px 22px }
.bonusbox h3 { font-family: "Fredoka", sans-serif; font-weight: 700; font-size: 22px; margin: 0 0 6px } .bonusbox p { font-size: 13px; line-height: 1.45 } .bonusbox .url { font-weight: 800 }
.share { text-align: center; font-size: 12.5px; margin-top: 18px; opacity: .85 }


.famart { flex: 1; min-height: 0; margin: 12px 0 8px } .famart svg { display: block }
.famkids { grid-column: 1 / -1; height: 2.4in; margin-top: 10px }
.letter { font-size: 15px } .famhow ol, .famtips ul { font-size: 13.5px }
.thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 0 0 18px } .thumbs img { width: 100%; border-radius: 6px; display: block; box-shadow: 0 0 0 1px rgba(29,41,64,.12) }
.rtips ul { font-size: 13.5px } .storytxt p { font-size: 14.5px }
.buybox { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 14px 0 4px } .buybox div { background: ${C.tSun}; border-radius: 12px; padding: 12px 14px; font-size: 12.5px; line-height: 1.45 }
.lic { font-size: 13px } .small { font-size: 12px }
.moreart { margin-top: auto; height: 2.5in }
/* review fixes: rules 4-8, 14 */
.keep { font-weight: 800; opacity: 1 }
.nocut { font-size: 12.5px; line-height: 1.45; background: ${C.wash}; border-radius: 10px; padding: 8px 12px; margin: -4px 0 12px }
.whybox { margin-top: auto; display: grid; grid-template-columns: 1.45fr 1fr; gap: 14px; margin-bottom: 12px }
.whybox > div { background: ${C.tSky}; border-radius: 16px; padding: 14px 18px; font-size: 13px; line-height: 1.5 } .whybox p { margin: 0 0 6px }
.whybox .lines { font-family: "Fredoka", sans-serif; font-weight: 600; font-size: 17px; line-height: 1.4 }
.whybox + .needbox { margin-top: 0 }
.nocutbox { margin-top: 18px; background: ${C.tSun}; border-radius: 14px; padding: 14px 18px; font-size: 13.5px; line-height: 1.45 } .nocutbox p { margin: 0 }
.vquick { font-size: 12.5px; line-height: 1.4; margin: -4px 0 10px; padding-left: 10px; border-left: 3px solid ${C.sun} }
.vars { gap: 12px } .var { padding: 14px 20px 14px } .var ol { margin-bottom: 8px } .var li { margin-bottom: 3px }
/* ink-saver edition */
.ink .pbanner { background: #fff; color: ${C.tomato}; border: 5px solid ${C.tomato} } .ink .pbanner span { color: ${C.ink} }
.ink .wobin { background: #fff; border: 3px solid ${C.tomato} }
.ink .track th { background: #fff; color: ${C.ink}; border-bottom: 3px solid ${C.ink} }
.ink .cert { border-width: 4px }
.ink .snum { background: #fff; color: ${C.tomato}; border: 3px solid ${C.tomato} }
.ink .pill { box-shadow: inset 0 0 0 2px ${C.ink} }
`;
};

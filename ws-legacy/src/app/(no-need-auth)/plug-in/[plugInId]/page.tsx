import Script from "next/script";

export default function PlugInPage({
  params,
}: {
  params: { plugInId: string };
}) {
  const { plugInId } = params;
  return (
    <Script id="plug-in page">
      {`(function () { const w = window; const dcty = function () { dcty.c(arguments); }; dcty.params = []; dcty.c = function (args) { dcty.params.push(args); }; w.Docenty = dcty; function l() { if (w.DocentyInitialized) { return; } w.DocentyInitialized = true; if (!document.getElementById('dcty-plug-in')) { var n = document.createElement('div'); (n.id = 'dcty-plug-in'), document.body.appendChild(n); } var e; var i = document.getElementById('dcty-plug-in'); i.style.position = "relative"; i.style.zIndex = 9999; i.innerHTML += '<div id="dcty-plug-in-button-wrapper"></div><div id="dcty-plug-in-iframe-wrapper" style="display:none;"><iframe id="dcty-plug-in-iframe" title="Docenty chat" style="position:relative!important;height:100%!important;width:100%!important;border:none!important;"></iframe></div>'; var t = document.getElementById('dcty-plug-in-iframe'); (r = !1), (o = function () { var e = t.contentDocument || t.contentWindow.document; e.open(), e.write('<!DOCTYPE html><script async type="text/javascript" src="https://cdn.docenty.ai/dcty-plug-in.js" charset="UTF-8"><\/script>',), e.write('<html lang="en"><head><meta charset="utf-8"></head><body><div id="dcty-root"><\/div><\/body><\/html>',), e.close(), (r = !0); }); t.onload || o(), (t.onload = function () { r || o(); }); } if (document.readyState === 'complete') { l(); } else { w.addEventListener('DOMContentLoaded', l); w.addEventListener('load', l); } })();

Docenty({
  plugInKey: '${plugInId}',
});`}
    </Script>
  );
}

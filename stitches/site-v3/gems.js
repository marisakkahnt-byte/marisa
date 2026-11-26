/* Sprinkles a few slowly drifting, glinting gems into chosen sections. */
(function(){
  var G=['ruby','sapphire','emerald','amethyst','citrine','crystal'];
  var spots={'.hero':[[6,18],[90,12],[46,86],[93,70]],'.pricing-section':[[4,10],[95,22],[8,88]],'.form-section':[[92,14],[5,60]],'.faq-section':[[94,8],[3,40],[96,86]],'.ig-section':[[6,30],[94,60]]};
  function add(){
    Object.keys(spots).forEach(function(sel){
      var sec=document.querySelector(sel); if(!sec) return;
      if(getComputedStyle(sec).position==='static') sec.style.position='relative';
      var layer=document.createElement('div'); layer.className='fgem-layer'; layer.setAttribute('aria-hidden','true');
      spots[sel].forEach(function(p,i){
        var g=document.createElement('span'), sz=30+Math.round(Math.random()*22);
        g.className='fgem';
        g.style.cssText='left:'+p[0]+'%;top:'+p[1]+'%;width:'+sz+'px;height:'+sz+'px;background-image:url(gem-'+G[(i+sel.length)%G.length]+'.png);--d:'+(7+Math.random()*5).toFixed(1)+'s;--s:'+(2.8+Math.random()*2).toFixed(1)+'s;--dl:-'+(Math.random()*6).toFixed(1)+'s;--r0:'+Math.round(Math.random()*40-20)+'deg';
        layer.appendChild(g);
      });
      sec.insertBefore(layer, sec.firstChild);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',add); else add();
})();

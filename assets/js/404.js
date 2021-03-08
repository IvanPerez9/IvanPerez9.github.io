/*
Transitions
*/
var t = gsap.timeline();

t.from('.text-404',{
  delay: 2, opacity:0, duration:1, x:20,
});
t.from('.text-not',{
  opacity:0, duration:2, x:-20,
});


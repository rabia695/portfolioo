/* СЛАЙДЫ КЕЙСА KINNI. Картинки лежат в images/kinni/.
   Чтобы убрать слайд, удалите его строку. Чтобы добавить, положите файл в папку и впишите имя.
   Подписи для скринридера генерируются сами: «Кинни, презентация, слайд 3 из 16». */
window.KINNI = {
  /* картинки для первого экрана, листаются по кругу */
  /* сдвиг кадра в первом экране: 0% — показать левый край, 100% — правый */
  heroPos: { 'bb-37.webp': '0% 50%' },
  /* носители для страницы кейса: из брендбука, в порядке показа */
  collateral: ['bb-36.webp', 'bb-35.webp', 'bb-37.webp', 'bb-41.webp', 'bb-42.webp', 'bb-38.webp', 'bb-39.webp', 'bb-40.webp', 'bb-43.webp'],
  hero: ['bb-41.webp', 'bb-37.webp', 'bb-42.webp', 'bb-43.webp', 'bb-36.webp'],
  presentation: [
    'pr-01.webp',
    'pr-02.webp',
    'pr-03.webp',
    'pr-04.webp',
    'pr-05.webp',
    'pr-06.webp',
    'pr-07.webp',
    'pr-08.webp',
    'pr-09.webp',
    'pr-10.webp',
    'pr-11.webp',
    'pr-12.webp',
    'pr-13.webp',
    'pr-14.webp',
    'pr-15.webp',
    'pr-16.webp',
    'pr-17.webp',
    'pr-18.webp',
    'pr-19.webp',
    'pr-20.webp',
    'pr-21.webp',
    'pr-22.webp',
    'pr-23.webp',
    'pr-24.webp',
    'pr-25.webp',
    'pr-26.webp',
    'pr-27.webp',
    'pr-28.webp',
    'pr-29.webp',
    'pr-30.webp',
    'pr-31.webp',
    'pr-32.webp',
    'pr-33.webp',
    'pr-34.webp',
    'pr-35.webp',
    'pr-36.webp',
    'pr-37.webp',
    'pr-38.webp',
    'pr-39.webp',
    'pr-40.webp',
    'pr-41.webp',
    'pr-42.webp',
    'pr-43.webp'
  ],
  brandbook: (function () {
    var a = [];
    for (var i = 1; i <= 43; i++) a.push('bb-' + (i < 10 ? '0' : '') + i + '.webp');
    return a;
  })()
};

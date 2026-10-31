/* ПРОЕКТЫ. Чтобы добавить новый проект:
   1. Скопируйте любой блок от { до }, (вместе с запятой) и вставьте В НАЧАЛО списка,
      сразу после строки window.PROJECTS = [  . Тогда он будет первым на сайте.
   2. Положите картинки в папку images/projects/ и впишите пути в images.
   3. Заполните тексты на русском (ru) и английском (en).
   Подробная инструкция есть в README.md.

   Поля проекта:
   id       короткое имя латиницей, без пробелов
   behance  ссылка на проект на Behance (если пусто, кнопки у проекта не будет)
   images   список картинок: ['images/projects/vivante-1.jpg', ...]
   tag      короткая подпись (вид проекта, город)
   task     задача
   did      что сделано
   result   что получилось (можно оставить пустым, если есть цифры в stats)
   stats    цифры результата: [{ v: '87%', t: 'подпись' }]. Если цифр нет, оставьте []
   note     мелкая приписка (необязательно)
   gap      true у картинки — небольшой просвет после неё (1% ширины)
   cover    обложка для карточки на главной: 'images/projects/vivante/09.webp'
   client, caseTask, timeline, solution (список), caseStats
            необязательные поля для блока «О проекте» на странице кейса
            (заказчик, задача, срок, решение, цифры). Если client заполнен,
            блок показывается в три колонки. Карточка на главной их не использует.
   story    содержимое страницы кейса (case.html). Внутри:
              tone    'dark' или 'light': картинки идут подряд без промежутков на чёрном
                      или белом фоне. Если не указано, между картинками небольшой просвет
              lead    вводная фраза под заголовком, в ru и en
              blocks  блоки по порядку. Два вида:
                      { t: 'text', ru: { title: '…', text: '…' }, en: { … } }
                      { t: 'img',  src: 'images/projects/vivante/01.jpg', w: 1800, h: 1083,
                                   ru: { alt: '…', caption: '…' }, en: { … } }
                      w, h — ширина и высота файла в пикселях (чтобы страница не прыгала, пока грузится)
                      alt — описание картинки для незрячих, обязательно.
                      caption — подпись под картинкой, можно оставить пустой.
                      Пока src пустой, на месте картинки серая подсказка. */

window.PROJECTS = [

  {
    id: 'kinni',
    behance: '',
    images: [],
    cover: 'images/kinni/cover.webp',
    story: {
      kinni: true,   /* на странице кейса показываются карточки и слайдеры из content/kinni.js */
      ru: { lead: 'Полный фирменный стиль сервиса анонимных разговоров: от смысла названия до брендбука.' },
      en: { lead: 'A complete brand identity for an anonymous conversation service: from the meaning of the name to the brand book.' },
      blocks: []
    },
    ru: {
      title: 'Кинни',
      tag: 'Фирменный стиль',
      task: 'Создать бренд сервиса анонимных разговоров для эмоциональной поддержки: тёплый, спокойный и безопасный.',
      did: 'Платформа бренда, логотип, палитра и шрифты, 30 иллюстраций и иконки-эмоции, носители и упаковка, брендбук на 43 слайда.'
    },
    en: {
      title: 'Kinni',
      tag: 'Brand identity',
      task: 'Create a brand for an anonymous conversation service for emotional support: warm, calm and safe.',
      did: 'Brand platform, logo, palette and typefaces, 30 illustrations and emotion icons, collateral and packaging, a 43-slide brand book.'
    }
  },

  {
    id: 'vivante',
    behance: '',
    images: [],
    cover: 'images/projects/vivante/cover.webp',
    story: {
      tone: 'light',   /* картинки подряд без промежутков на белом фоне, как на dprofile */
      ru: { lead: 'Айдентика и коммуникация для нового формата продуктового магазина.' },
      en: { lead: 'Identity and communication for a new kind of grocery store.' },
      blocks: [
        { t: 'img', src: 'images/projects/vivante/01.webp', w: 1800, h: 1083,
          ru: { alt: 'Логотип Vivante и крупный план вешенки на светло-сером фоне', caption: '' },
          en: { alt: 'The Vivante logo and a close-up of an oyster mushroom on a light grey background', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/02.webp', gap: true, w: 1800, h: 1083,
          ru: { alt: 'Логотип Vivante на кремовом фоне и авокадо', caption: '' },
          en: { alt: 'The Vivante logo on a cream background with avocados', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/03.webp', gap: true, w: 1800, h: 1008,
          ru: { alt: 'Торговый зал Vivante: круглый остров с фруктами и светящаяся вывеска', caption: '' },
          en: { alt: 'The Vivante store hall: a round fruit island and a glowing sign', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/04.webp', gap: true, w: 1800, h: 1189,
          ru: { alt: 'Путеводители Floor Guide на чёрном мраморе и навигационная стойка у стены', caption: '' },
          en: { alt: 'Floor Guide leaflets on black marble and a wayfinding stand against a wall', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/05.webp', gap: true, w: 1800, h: 1183,
          ru: { alt: 'Крафтовый пакет Vivante на фруктовом прилавке и путеводители Floor Guide', caption: '' },
          en: { alt: 'A Vivante kraft bag on a fruit counter with Floor Guide leaflets', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/06.webp', gap: true, w: 1800, h: 1064,
          ru: { alt: 'Стопка тёмных корзин с логотипом Vivante и крафтовый пакет с фирменным знаком', caption: '' },
          en: { alt: 'A stack of dark baskets with the Vivante logo and a kraft bag with the brand mark', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/07.webp', w: 1800, h: 1080,
          ru: { alt: 'Логотип Vivante на кремовом фоне и папайя', caption: '' },
          en: { alt: 'The Vivante logo on a cream background with papayas', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/08.webp', gap: true, w: 1800, h: 1083,
          ru: { alt: 'Логотип Vivante и вешенки на светло-сером фоне', caption: '' },
          en: { alt: 'The Vivante logo and oyster mushrooms on a light grey background', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/09.webp', gap: true, w: 1800, h: 1334,
          ru: { alt: 'Билборд Vivante на фасаде: белый логотип на тёмно-зелёном фоне и клубника', caption: '' },
          en: { alt: 'A Vivante billboard on a façade: white logo on a dark green field with a strawberry', caption: '' } },
        { t: 'img', src: 'images/projects/vivante/10.webp', w: 1800, h: 1061,
          ru: { alt: 'Два постера Vivante на стене из тёмного дерева: «Fresh food, clean choices» и логотип рядом со стейком', caption: '' },
          en: { alt: 'Two Vivante posters on a dark wood wall: “Fresh food, clean choices” and the logo next to a steak', caption: '' } }
      ]
    },
    ru: {
      title: 'Vivante',
      tag: 'Концептуальный проект',
      task: 'Создать айдентику и коммуникацию для нового формата продуктового магазина, который конкурирует с премиум-сегментом: эстетичнее, минималистичнее, чище.',
      did: 'Исследование аудитории и конкурентов, бренд-платформа, логотип, носители, упаковка, digital-коммуникация, арт-дирекшн фотосъёмки и интеграция знака в среду магазина.',
      result: 'По итогам опроса покупателей:',
      stats: [
        { v: '87%', t: 'отметили, что бренд выглядит премиальнее привычных магазинов продуктов' },
        { v: '52%', t: 'рост намерения купить благодаря визуальной подаче и акценту на «чистый продукт»' },
        { v: '1200+', t: 'покупателей опрошено при создании визуального языка' }
      ],
      /* только для страницы кейса */
      client: 'международный премиальный grocery-ритейлер Vivante — концептуальный магазин цельных продуктов с акцентом на качество, происхождение и осознанное потребление',
      caseTask: 'создать визуальную айдентику и коммуникационную систему для нового формата продуктового магазина, который конкурирует с премиум-сегментом (уровня Whole Foods / Eataly), предлагая более эстетичный, минималистичный и «чистый» пользовательский опыт',
      timeline: '3 месяца с момента подписания договора и утверждения ключевых этапов',
      solution: [
        'маркетинговое исследование: анализ ЦА (количественный и качественный), трендвотчинг, бенчмаркинг, конкурентный анализ, формирование бренд-платформы',
        'переосмысление визуального языка продуктового ритейла в сторону премиального минимализма',
        'организация и арт-дирекшн фотосъёмки продуктов',
        'разработка визуальной системы: логотип, рекламные носители, упаковка, digital-коммуникация',
        'интеграция фирменного знака в среду (вывеска, упаковка, навигация)',
        'создание визуального сценария взаимодействия клиента с брендом'
      ],
      caseStats: [
        { v: '87%', t: 'пользователей отметили, что бренд воспринимается как более премиальный по сравнению с привычными grocery-форматами' },
        { v: '52%', t: 'рост намерения к покупке за счёт визуальной подачи и акцента на «чистый продукт»' },
        { v: '1200+', t: 'покупателей были опрошены для формирования визуального языка и пользовательского восприятия' }
      ]
    },
    en: {
      title: 'Vivante',
      tag: 'Concept project',
      task: 'Create the identity and communication for a new kind of grocery store that competes with the premium segment: more aesthetic, more minimal, cleaner.',
      did: 'Audience and competitor research, brand platform, logo, collateral, packaging, digital communication, art direction of the product photo shoot and integration of the mark into the store environment.',
      result: 'Survey results:',
      stats: [
        { v: '87%', t: 'said the brand feels more premium than familiar grocery stores' },
        { v: '52%', t: 'increase in purchase intent thanks to the visual presentation and the focus on a “clean product”' },
        { v: '1200+', t: 'shoppers surveyed to shape the visual language' }
      ],
      client: 'Vivante — an international premium grocery retailer focused on whole foods, quality sourcing, and conscious consumption',
      caseTask: 'to develop a visual identity and communication system for a new retail format positioned within the premium segment (comparable to Whole Foods / Eataly), while delivering a more refined, minimal, and “clean” customer experience',
      timeline: '3 months from contract approval to final delivery',
      solution: [
        'in-depth marketing research: audience analysis (quantitative & qualitative), trend research, benchmarking, competitor analysis, and brand platform development',
        'redefining the visual language of grocery retail towards premium minimalism',
        'art direction and production of food photography',
        'development of a cohesive visual system: logo, packaging, campaign assets, and digital communication',
        'integration of the brand mark into physical touch points (signage, packaging, navigation)',
        'designing a consistent visual journey across the customer experience'
      ],
      caseStats: [
        { v: '87%', t: 'of users perceived the brand as more premium compared to traditional grocery formats' },
        { v: '52%', t: 'increase in purchase intent driven by visual presentation and the “clean product” concept' },
        { v: '1200+', t: 'customers were surveyed to define the visual language and user perception' }
      ]
    }
  },

  {
    id: 'florista',
    behance: '',
    images: [],
    cover: 'images/projects/florista/cover.webp',
    story: {
      tone: 'dark',   /* картинки подряд без промежутков на чёрном фоне */
      ru: { lead: 'Иллюстративная айдентика цветочного бутика в формате каталога эмоций.' },
      en: { lead: 'An illustrative identity for a flower boutique, built as a catalogue of emotions.' },
      blocks: [
        { t: 'text',
          ru: { title: 'О проекте', text: 'Florista — цветочный бутик в Москве, где букет задуман как выражение чувств. Визуальный стиль опирается на иллюстративную айдентику в формате цветочного каталога: это не перечень растений, а эмоциональный путеводитель, где каждый цветок передаёт своё состояние.' },
          en: { title: 'About the project', text: 'Florista is a flower boutique in Moscow where a bouquet is meant as an expression of feeling. The visual style rests on an illustrative identity in the form of a flower catalogue: not a list of plants, but an emotional guide in which every flower carries its own state of mind.' } },
        { t: 'text',
          ru: { title: 'Каталог эмоций', text: '64 уникальные иллюстрации цветов, нарисованные вручную. Каждая задумана как самостоятельный арт-объект и передаёт отдельную эмоцию, от нежности до восхищения.' },
          en: { title: 'A catalogue of emotions', text: '64 unique flower illustrations, drawn by hand. Each is conceived as a work in its own right and carries a separate emotion, from tenderness to admiration.' } },
        { t: 'text',
          ru: { title: 'Носители', text: 'Фирменные открытки и постеры в той же эстетике каталога. Айдентика помогает не только продавать цветы, но и давать язык для невербального общения.' },
          en: { title: 'Collateral', text: 'Brand postcards and posters in the same spirit as the catalogue. The identity helps not only to sell flowers but to give people a language for saying things without words.' } },
        { t: 'img', src: 'images/projects/florista/01.webp', w: 1500, h: 5811,
          ru: { alt: 'Каталог цветов Florista: иллюстрации с названиями эмоций на чёрном фоне', caption: '' },
          en: { alt: 'The Florista catalogue: flower illustrations labelled with emotions on a black background', caption: '' } },
        { t: 'img', src: 'images/projects/florista/02.webp', w: 2000, h: 736,
          ru: { alt: 'Четыре белых постера Florista с цитатами и цветными иллюстрациями цветов', caption: '' },
          en: { alt: 'Four white Florista posters with quotes and colourful flower illustrations', caption: '' } },
        { t: 'img', src: 'images/projects/florista/03.webp', w: 2000, h: 204,
          ru: { alt: 'Ряд из десяти цветов Florista на чёрном фоне, цветы сменяют друг друга', caption: '' },
          en: { alt: 'A row of ten Florista flowers on a black background, the flowers change one after another', caption: '' } },
        { t: 'img', src: 'images/projects/florista/04.webp', w: 2000, h: 736,
          ru: { alt: 'Четыре чёрных постера Florista с цитатами и светящимися цветами', caption: '' },
          en: { alt: 'Four black Florista posters with quotes and glowing flowers', caption: '' } },
        { t: 'img', src: 'images/projects/florista/05.webp', w: 2000, h: 1303,
          ru: { alt: 'Постер Florista с каталогом цветов на стене в тёплом интерьере', caption: '' },
          en: { alt: 'A Florista poster with the flower catalogue on a wall in a warm interior', caption: '' } },
        { t: 'img', src: 'images/projects/florista/06.webp', w: 2000, h: 204,
          ru: { alt: 'Ряд из десяти цветов Florista на чёрном фоне, цветы сменяют друг друга', caption: '' },
          en: { alt: 'A row of ten Florista flowers on a black background, the flowers change one after another', caption: '' } },
        { t: 'img', src: 'images/projects/florista/07.webp', w: 2000, h: 1235,
          ru: { alt: 'Два постера Florista на стене: белый с крупным текстом и чёрный с цветами', caption: '' },
          en: { alt: 'Two Florista posters on a wall: a white one with large type and a black one with flowers', caption: '' } }
      ]
    },
    ru: {
      title: 'Florista',
      tag: 'Цветочный бутик, Москва',
      task: 'Показать, что букет — это способ сказать о чувствах, и выразить это в визуальном стиле.',
      did: 'Иллюстративная айдентика в виде «каталога эмоций»: 64 иллюстрации цветов, нарисованные вручную. Каждая передаёт своё состояние, от нежности до восхищения. Фирменные открытки и постеры в той же эстетике.',
      result: 'Каталог из 64 иллюстраций, на котором строится весь визуальный язык бренда.',
      stats: [
        { v: '64', t: 'иллюстрации цветов, каждая со своей эмоцией' }
      ],
      note: ''
    },
    en: {
      title: 'Florista',
      tag: 'Flower boutique, Moscow',
      task: 'Show that a bouquet is a way to speak about feelings, and express it in the visual style.',
      did: 'An illustrative identity built as a catalogue of emotions: 64 hand-drawn flower illustrations, each expressing its own feeling, from tenderness to admiration. Brand postcards and posters in the same spirit.',
      result: 'A catalogue of 64 illustrations that the whole visual language of the brand is built on.',
      stats: [
        { v: '64', t: 'flower illustrations, each with its own emotion' }
      ],
      note: ''
    }
  },

  {
    id: 'nomad',
    behance: '',
    images: [],
    cover: 'images/projects/nomad/cover.webp',
    story: {
      ru: { lead: 'Фирменный стиль семейного бренда с коллекцией из 50 персонажей.' },
      en: { lead: 'The identity of a family brand built on a collection of 50 characters.' },
      tone: 'dark',
      blocks: [
        { t: 'img', src: 'images/projects/nomad/01.webp', w: 1800, h: 1270,
          ru: { alt: 'Персонажи НОМАД на бирюзовом фоне', caption: '' },
          en: { alt: 'NOMAD characters on a turquoise background', caption: '' } },
        { t: 'text',
          ru: { title: 'О проекте', text: '«НОМАД» — семейный бренд из Республики Алтай, вдохновлённый культурой кочевых племён. В основе продукта — ток-чок, национальная сладость, история которой уходит вглубь тысячелетий. Когда-то этот десерт могли позволить себе лишь избранные семьи кочевников: рецепт хранился внутри рода и передавался от старших к младшим как часть родовой памяти. Название отсылает к древнему миру кочевников, к преемственности, связи времён и семейной идентичности, и этот культурный код лёг в основу визуальной концепции. Сегодня «НОМАД» остаётся единственным брендом в России, сохраняющим традиционный подход к созданию ток-чока.' },
          en: { title: 'About the project', text: 'NOMAD is a family-owned brand from the Altai Republic, inspired by the heritage of nomadic culture. At the heart of the product is tok-chok, a traditional sweet with a story spanning millennia. Once reserved for select nomadic families, the recipe was a guarded secret passed down through generations as a form of ancestral memory. The name evokes continuity, kinship and cultural identity, and this narrative became the foundation of the visual concept. Today NOMAD remains the only brand in Russia preserving the traditional methods of crafting tok-chok.' } },
        { t: 'img', src: 'images/projects/nomad/02.webp', w: 1800, h: 1270,
          ru: { alt: 'Персонаж НОМАД', caption: '' },
          en: { alt: 'A NOMAD character', caption: '' } },
        { t: 'text',
          ru: { title: 'Айдентика', text: 'Визуальный стиль строится вокруг коллекции из 50 персонажей в стилизованных национальных головных уборах. Каждый из них — часть одной родовой системы, отражающей идею большой семьи: узнаваемой, цельной, но с индивидуальностью в каждой детали. Айдентика сочетает модульность, ритм и повтор, что позволяет легко масштабировать стиль на упаковку, цифровые форматы, рекламу и мерч. Персонажи становятся не только метафорой бренда, но и носителями добрых посланий — напоминанием о тёплой семейной поддержке.' },
          en: { title: 'Visual identity', text: 'The visual language of NOMAD revolves around a collection of 50 illustrated characters wearing stylised traditional headwear. Together they represent an extended family: united in spirit, yet each distinct in detail. The identity relies on modular design, repetition and rhythm, so it scales across packaging, digital campaigns, merchandise and more. Each character is not just a symbol of the brand but a gentle messenger of care and encouragement.' } },
        { t: 'img', src: 'images/projects/nomad/03.webp', gap: true, w: 1800, h: 1065,
          ru: { alt: 'Фирменный стиль НОМАД', caption: '' },
          en: { alt: 'NOMAD identity', caption: '' } },
        { t: 'img', src: 'images/projects/nomad/04.webp', gap: true, w: 1800, h: 1231,
          ru: { alt: 'Персонажи в национальных головных уборах', caption: '' },
          en: { alt: 'Characters in traditional headwear', caption: '' } },
        { t: 'img', src: 'images/projects/nomad/05.webp', gap: true, w: 1800, h: 1172,
          ru: { alt: 'Система персонажей НОМАД', caption: '' },
          en: { alt: 'The NOMAD character system', caption: '' } },
        { t: 'img', src: 'images/projects/nomad/06.webp', w: 1800, h: 1200,
          ru: { alt: 'Айдентика НОМАД', caption: '' },
          en: { alt: 'NOMAD identity', caption: '' } },
        { t: 'text',
          ru: { title: 'Диджитал и промо', text: 'Для продвижения бренда в локальных интернет-магазинах и социальных сетях была разработана серия веб-баннеров, адаптированных под бюджетные рекламные форматы. Это позволило расширить охват аудитории без дополнительных затрат на офлайн-рекламу.' },
          en: { title: 'Digital and promo', text: 'A series of web banners was created to promote NOMAD in local online stores and on social media. The format was tailored to low-budget ad placements, allowing the brand to reach its audience without large-scale offline advertising.' } },
        { t: 'img', src: 'images/projects/nomad/07.webp', w: 1800, h: 2151,
          ru: { alt: 'Веб-баннеры НОМАД', caption: '' },
          en: { alt: 'NOMAD web banners', caption: '' } },
        { t: 'img', src: 'images/projects/nomad/09.webp', w: 1800, h: 2499,
          ru: { alt: 'Баннеры НОМАД', caption: '' },
          en: { alt: 'NOMAD banners', caption: '' } },
        { t: 'text',
          ru: { title: 'Стикерпак', text: 'Чтобы вызвать интерес у молодой аудитории, был создан стикерпак с персонажами в Telegram. Минималистичная анимация и эмоциональные реплики усиливают узнаваемость бренда в повседневной цифровой коммуникации.' },
          en: { title: 'Sticker pack', text: 'To engage a younger audience, a Telegram sticker pack featuring the brand characters was designed. Minimalist animation and friendly phrases make the brand more relatable and recognisable in everyday digital interactions.' } },
        { t: 'img', src: 'images/projects/nomad/10.webp', w: 1800, h: 1270,
          ru: { alt: 'Стикерпак НОМАД для Telegram', caption: '' },
          en: { alt: 'NOMAD Telegram sticker pack', caption: '' } },
        { t: 'text',
          ru: { title: 'Мерч и упаковка', text: 'Каждая упаковка ток-чока — не просто обёртка, а часть коллекции с уникальным персонажем. Некоторые этикетки сопровождаются поддерживающими посланиями, возвращая ощущение заботы и связи, важное в культуре семейных традиций. Дополнительно бренд предлагает лимитированную линейку мерча, включая сумки для доставки с фирменной символикой: они легко узнаются в городской среде и поддерживают присутствие бренда в реальном мире.' },
          en: { title: 'Merch and packaging', text: 'Each tok-chok package is not just a wrapper but part of a collectible series featuring a unique character. Some labels include uplifting messages, offering a touch of warmth and connection that echoes the brand’s family values. A limited-edition merch line, including branded delivery bags, extends the brand’s presence into the urban landscape.' } },
        { t: 'img', src: 'images/projects/nomad/11.webp', gap: true, w: 1800, h: 2528,
          ru: { alt: 'Упаковка ток-чока НОМАД', caption: '' },
          en: { alt: 'NOMAD tok-chok packaging', caption: '' } },
        { t: 'img', src: 'images/projects/nomad/12.webp', w: 1800, h: 1209,
          ru: { alt: 'Мерч НОМАД: сумки для доставки', caption: '' },
          en: { alt: 'NOMAD merchandise: delivery bags', caption: '' } }
      ]
    },
    ru: {
      title: 'НОМАД',
      tag: 'Семейный бренд, Республика Алтай',
      task: 'Передать в визуале семейную традицию ток-чока, национальной сладости, и сделать стиль, который легко масштабируется.',
      did: 'Коллекция из 50 персонажей в стилизованных национальных головных уборах, упаковка со своим персонажем на каждой, веб-баннеры для интернет-магазинов и соцсетей, стикерпак в Telegram с анимацией и мерч: сумки для доставки.',
      result: 'Единая система, которая работает на упаковке, в интернете и на мерче.',
      stats: [
        { v: '50', t: 'персонажей в коллекции' }
      ],
      note: 'Бренд позиционируется как единственный в России, сохраняющий традиционный подход к созданию ток-чока.'
    },
    en: {
      title: 'NOMAD',
      tag: 'Family brand, Altai Republic',
      task: 'Convey the family tradition of tok-chok, a national sweet, in the visuals and make an identity that scales easily.',
      did: 'A collection of 50 characters in stylised national headdresses, packaging with its own character on each pack, web banners for online shops and social media, an animated Telegram sticker pack and merchandise: delivery bags.',
      result: 'One system that works on packaging, online and on merchandise.',
      stats: [
        { v: '50', t: 'characters in the collection' }
      ],
      note: 'The brand positions itself as the only one in Russia that keeps the traditional way of making tok-chok.'
    }
  }

];

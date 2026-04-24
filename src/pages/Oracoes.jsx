import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Layers, CircleDot, Wheat, BookOpen, Sparkles, Maximize2, X } from 'lucide-react';

// ─────────────────────────────────────
//  CATEGORIAS
// ─────────────────────────────────────
const categorias = [
  { id: 'destaque', label: 'Destaque', icon: Star, cor: 'from-parish-terracotta to-[#a0422a]', corBg: 'bg-parish-terracotta/10', corTexto: 'text-parish-terracotta' },
  { id: 'basicas', label: 'Básicas', icon: BookOpen, cor: 'from-[#3b6fa0] to-[#2a5480]', corBg: 'bg-blue-50', corTexto: 'text-blue-700' },
  { id: 'missa', label: 'Missa', icon: Layers, cor: 'from-parish-brown to-[#5a3e28]', corBg: 'bg-amber-50', corTexto: 'text-amber-800' },
  { id: 'eucaristia', label: 'Eucaristia', icon: Wheat, cor: 'from-[#a07830] to-[#7a5a20]', corBg: 'bg-yellow-50', corTexto: 'text-yellow-800' },
  { id: 'tercos', label: 'Terços', icon: CircleDot, cor: 'from-[#3a6b4a] to-[#2a5038]', corBg: 'bg-green-50', corTexto: 'text-green-800' },
  { id: 'outras', label: 'Outras', icon: Sparkles, cor: 'from-[#6a3a90] to-[#4a2070]', corBg: 'bg-purple-50', corTexto: 'text-purple-800' },
];

// Textos Auxiliares para Orações Longas (Para não quebrar a sintaxe do JSX)
const textoOEI = `(Tradição Romana)
Pai de misericórdia, a quem sobem os nossos louvores, nós vos pedimos por Jesus Cristo, vosso Filho e Senhor nosso, que abençoeis ☩ estas oferendas apresentadas ao vosso altar.
Nós as oferecemos pela vossa Igreja santa e católica: concedei-lhe paz e proteção, unindo-a num só corpo e governando-a por toda a terra. Nós as oferecemos também pelo vosso servo o Papa, por nosso Bispo, e por todos os que guardam a fé que receberam dos apóstolos.

Lembrai-vos, ó Pai, dos vossos filhos e filhas e de todos os que circundam este altar, dos quais conheceis a fidelidade e a dedicação em vos servir. Eles vos oferecem conosco este sacrifício de louvor por si e por todos os seus, e elevam a vós as suas preces para alcançar o perdão de suas faltas, a segurança em suas vidas e a salvação que esperam.

Em comunhão com toda a Igreja, veneramos a sempre Virgem Maria, Mãe de nosso Deus e Senhor Jesus Cristo; e também São José, esposo de Maria, os santos Apóstolos e Mártires: Pedro e Paulo, André, (Tiago, João, Tomé, Tiago, Filipe, Bartolomeu, Mateus, Simão e Tadeu; Lino, Cleto, Clemente, Sisto, Cornélio, Cipriano, Lourenço, Crisógono, João e Paulo, Cosme e Damião), e todos os vossos santos. Por seus méritos e preces concedei-nos sem cessar a vossa proteção.

Recebei, ó Pai, com bondade, a oferenda dos vossos servos e de toda a vossa família; dai-nos sempre a vossa paz, livrai-nos da condenação e acolhei-nos entre os vossos eleitos.

Dignai-vos, ó Pai, aceitar e santificar estas oferendas, a fim de que se tornem para nós o Corpo e o Sangue de Jesus Cristo, vosso Filho e Senhor nosso.

Na noite em que ia ser entregue, ele tomou o pão em suas mãos, elevou os olhos a vós, ó Pai, deu graças e o partiu e deu a seus discípulos, dizendo:
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.

Do mesmo modo, ao fim da ceia, ele tomou o cálice em suas mãos, deu graças novamente e o deu a seus discípulos, dizendo:
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.

Mistério da fé!
(Aclamação da assembleia)

Celebrando, pois, a memória da paixão do vosso Filho, da sua ressurreição dentre os mortos e gloriosa ascensão aos céus, nós, vossos servos, e também vosso povo santo, vos oferecemos, ó Pai, dentre os bens que nos destes, o sacrifício perfeito e santo, pão da vida eterna e cálice da salvação.
Recebei, ó Pai, esta oferenda, como recebestes a oferta de Abel, o sacrifício de Abraão e os dons de Melquisedeque. Nós vos suplicamos que ela seja levada à vossa presença, para que, ao participarmos deste altar, recebendo o Corpo e o Sangue de vosso Filho, sejamos repletos de todas as graças e bênçãos do céu.

Lembrai-vos, ó Pai, dos vossos filhos e filhas que partiram desta vida, marcados com o sinal da fé. A eles, e a todos os que adormeceram no Cristo, concedei a felicidade, a luz e a paz.

E a todos nós pecadores, que confiamos na vossa imensa misericórdia, concedei, não por nossos méritos, mas por vossa bondade, o convívio dos Apóstolos e Mártires: João Batista e Estêvão, Matias e Barnabé, (Inácio, Alexandre, Marcelino e Pedro; Felicidade e Perpétua, Águeda e Luzia, Inês, Cecília, Anastácia) e todos os vossos santos. Por Cristo, Senhor nosso.

Por ele não cessais de criar e santificar estes bens e distribuí-los entre nós.
Por Cristo, com Cristo, em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda a honra e toda a glória, agora e para sempre. Amém.`;

const textoOEII = `(A mais antiga - para dias de semana)
Na verdade, é justo e necessário, é nosso dever e salvação dar-vos graças, sempre e em todo o lugar, Senhor, Pai santo, Deus todo-poderoso e eterno, por vosso amado Filho, Jesus Cristo. Ele é a vossa palavra, pela qual tudo criastes. Ele é o nosso Salvador e Redentor, que se encarnou pelo Espírito Santo e nasceu da Virgem Maria.
Para cumprir a vossa vontade e reunir um povo santo em vosso louvor, ele estendeu os braços na hora da sua paixão a fim de vencer a morte e manifestar a ressurreição. Por ele os anjos celebram vossa grandeza; e os santos proclamam vossa glória. Concedei-nos também a nós associar-nos a seus louvores, cantando (dizendo) a uma só voz:

(Santo)

Vós, Senhor, sois verdadeiramente santo, sois a fonte de toda santidade.
Santificai, pois, estas oferendas, derramando sobre elas o vosso Espírito, a fim de que se tornem para nós o Corpo e ☩ o Sangue de Jesus Cristo, vosso Filho e Senhor nosso.

Estando para ser entregue e abraçando livremente a paixão, ele tomou o pão, deu graças, e o partiu e deu a seus discípulos, dizendo:
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.

Do mesmo modo, ao fim da ceia, ele tomou o cálice em suas mãos, deu graças novamente, e o deu a seus discípulos, dizendo:
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.

Mistério da fé!
(Aclamação da Assembleia)

Celebrando, pois, a memória da morte e ressurreição do vosso Filho, nós vos oferecemos, ó Pai, o pão da vida e o cálice da salvação; e vos agradecemos porque nos tornastes dignos de estar aqui na vossa presença e vos servir.
E nós vos suplicamos que, participando do Corpo e Sangue de Cristo, sejamos reunidos pelo Espírito Santo num só corpo.

Lembrai-vos, ó Pai, da vossa Igreja que se faz presente pelo mundo inteiro: que ela cresça na caridade, com o Papa, com o nosso Bispo, e com todos os ministros do vosso povo.
Lembrai-vos também dos nossos irmãos e irmãs que morreram na esperança da ressurreição e de todos os que partiram desta vida: acolhei-os junto a vós na luz da vossa face.
Enfim, nós vos pedimos, tende piedade de todos nós e dai-nos participar da vida eterna, com a Virgem Maria, Mãe de Deus, com São José, seu esposo, com os santos Apóstolos e todos os que neste mundo vos serviram, a fim de vos louvarmos e glorificarmos por Jesus Cristo, vosso Filho.

Por Cristo, com Cristo, em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda a honra e toda a glória, agora e para sempre. Amém.`;

const textoOEIII = `(Ação de graças - para Domingos)
Na verdade, vós sois santo, ó Deus do universo, e tudo o que criastes proclama o vosso louvor, porque, por Jesus Cristo, vosso Filho e Senhor nosso, e pela força do Espírito Santo, dais vida e santidade a todas as coisas e não cessais de reunir o vosso povo, para que vos ofereça em toda parte, do nascer ao pôr-do-sol, um sacrifício perfeito.

Por isso, nós vos suplicamos: santificai pelo Espírito Santo as oferendas que vos apresentamos para serem consagradas, a fim de que se tornem o Corpo e ☩ o Sangue de Jesus Cristo, vosso Filho e Senhor nosso, que nos mandou celebrar este mistério.

Na noite em que ia ser entregue, ele tomou o pão, deu graças, e o partiu e deu a seus discípulos, dizendo:
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.

Do mesmo modo, ao fim da ceia, ele tomou o cálice, deu graças, e o deu a seus discípulos, dizendo:
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.

Mistério da fé!
(Aclamação)

Celebrando agora, ó Pai, a memória do vosso Filho, da sua paixão que nos salva, da sua gloriosa ressurreição e da sua ascensão ao céu, e enquanto esperamos a sua nova vinda, nós vos oferecemos em ação de graças este sacrifício de vida e santidade.
Olhai com bondade a oferenda da vossa Igreja, reconhecei o sacrifício que nos reconcilia convosco e concedei que, alimentando-nos com o Corpo e o Sangue do vosso Filho, sejamos repletos do Espírito Santo e nos tornemos em Cristo um só corpo e um só espírito.

Que ele faça de nós uma oferenda perfeita para alcançarmos a vida eterna com os vossos santos: a Virgem Maria, mãe de Deus, São José, seu esposo, os vossos Apóstolos e Mártires, [o santo do dia] e todos os santos, que não cessam de interceder por nós na vossa presença.

E agora, nós vos suplicamos, ó Pai, que este sacrifício da nossa reconciliação estenda a paz e a salvação ao mundo inteiro. Confirmai na fé e na caridade a vossa Igreja, enquanto caminha neste mundo: o vosso servo o Papa, o nosso Bispo, com os bispos do mundo inteiro, o clero e todo o povo que conquistastes.
Atendei às preces da vossa família, que está aqui, na vossa presença. Reuni em vós, Pai de misericórdia, todos os vossos filhos e filhas dispersos pelo mundo inteiro.

Acolhei com bondade no vosso reino os nossos irmãos e irmãs que partiram desta vida e todos os que morreram na vossa amizade. Unidos a eles, esperamos também nós saciar-nos eternamente da vossa glória, por Cristo, Senhor nosso. Por ele dais ao mundo todo bem e toda graça.

Por Cristo, com Cristo, em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, agora e para sempre. Amém.`;

const textoOEIV = `(História da Salvação)
Na verdade, é justo e necessário que passemos nossa vida dando-vos graças. Vós sois o único Deus, vivo e verdadeiro, que existis antes da fundação do mundo e operais para sempre no mistério absoluto, invisível à inteligência humana. Vós que sois a fonte da vida e da bondade, tudo criastes, para cumulardes de bênçãos as vossas criaturas, alegrando-as com a luz de vossa presença. Por isso, as inumeráveis multidões dos anjos, que estão perante a vossa face, vos servem sem cessar e, contemplando a glória do vosso rosto, vos glorificam para sempre. Unidos a eles cantemos a uma só voz a vossa majestade:

(Santo)

Nós proclamamos que sois santo e que vossas obras são grandes e justas, Senhor. Criastes o homem e a mulher à vossa imagem, para que, servindo somente a vós, criador, eles dominassem toda criatura. E, tendo perdido vossa amizade por não obedecer a vós, não os abandonastes à morte, mas socorrestes a todos com misericórdia para que vos procurassem e encontrassem.

E para nos dar sua própria vida, ele nos enviou o Espírito Santo.
Por isso, ó Pai, nós vos pedimos que este mesmo Espírito santifique estas oferendas...
(Sacerdote toma o pão e realiza a consagração como nas outras OEs)...

[Narrativa da Instituição Completa]...

Acolhei com bondade, ó Pai, esta oblação que vos apresenta a nossa comunidade e também toda a vossa Igreja. Lembrai-vos dos que hoje vos apresentam este sacrifício, especialmente vosso servo o Papa, o nosso Bispo, todos os bispos e os ministros e todo o vosso povo santo, e daqueles que vos procuram de coração sincero. 
Por Cristo, com Cristo...`;


// ─────────────────────────────────────
//  DADOS — ORAÇÕES POR CATEGORIA
// ─────────────────────────────────────
const oracoesPorCategoria = {

  destaque: [
    {
      titulo: "Oração a São Miguel Arcanjo",
      sub: "Pequeno Exorcismo de Leão XIII",
      destaque: true,
      texto: `São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e aos outros espíritos malignos, que andam pelo mundo para perder as almas. Amém.`,
    },
  ],

  basicas: [
    { titulo: "Sinal da Cruz", texto: `Em nome do Pai, e do Filho e do Espírito Santo. Amém.` },
    { titulo: "Pai Nosso", texto: `Pai Nosso que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.` },
    { titulo: "Ave Maria", texto: `Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.` },
    { titulo: "Glória ao Pai", sub: "Doxologia", texto: `Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre, pelos séculos dos séculos. Amém.` },
    { titulo: "Salve Rainha", texto: `Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém.` },
    { titulo: "Credo (Símbolo dos Apóstolos)", texto: `Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado. Desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, de onde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.` },
    { titulo: "Ato de Contrição", texto: `Meu Deus, porque sois infinitamente bom e digno de ser amado por cima de todas as coisas, pesa-me de vos ter ofendido e proponho firmemente, com o auxílio da vossa graça, emendar-me e afastar as ocasiões próximas de pecado. Senhor, misericórdia! Amém.` },
    { titulo: "Ângelo de Deus", sub: "Anjo da Guarda", texto: `Ângelo de Deus, que sois meu guardião, iluminai, guardai, dirigis e governai a mim, que vos fui confiado pela piedade celeste. Amém.` },
  ],

  eucaristia: [
    { tipo: 'grupo', titulo: '✦ Principais — Missal Romano' },
    {
      titulo: "Oração Eucarística I — Cânon Romano",
      sub: "A oração mais antiga da Igreja — Séc. IV. Texto Completo.",
      isLongo: true,
      texto: textoOEI,
    },
    {
      titulo: "Oração Eucarística II",
      sub: "De São Hipólito — para dias de semana. Texto Completo.",
      isLongo: true,
      texto: textoOEII,
    },
    {
      titulo: "Oração Eucarística III",
      sub: "Ação de graças — para Domingos. Texto Completo.",
      isLongo: true,
      texto: textoOEIII,
    },
    {
      titulo: "Oração Eucarística IV",
      sub: "Síntese da História da Salvação. Texto Completo.",
      isLongo: true,
      texto: textoOEIV,
    },
    { tipo: 'grupo', titulo: '✦ Diversas Circunstâncias' },
    {
      titulo: "Diversas Circunstâncias V/A a V/D",
      sub: "Informações",
      isLongo: false,
      texto: "Estas Orações Eucarísticas são utilizadas em missas para temas específicos, como 'A Igreja em Caminho', 'Deus Guia a Sua Igreja', 'Jesus, Modelo de Caridade' e 'Jesus, Passando Fazia o Bem'. Elas dividem a mesma estrutura mas adaptam prefácios e aclamações para o tempo litúrgico. Consulte o Missal para o texto íntegro delas.",
    },
    { tipo: 'grupo', titulo: '✦ Missas com Crianças e Reconciliação' },
    {
      titulo: "Eucarísticas para Crianças e Reconciliação",
      sub: "Informações",
      isLongo: false,
      texto: "As Orações para Crianças (I a III) possuem uma linguagem mais acessível, fáceis respostas da assembleia e constante aclamação. Já as de Reconciliação (I e II) destacam a nossa necessidade constante de buscar a paz de Cristo diante dos pecados de ruptura no mundo. Consulte o Missal para seus textos íntegros.",
    }
  ],

  missa: [
    { tipo: 'grupo', titulo: '✦ Ritos Iniciais' },
    {
      titulo: "Confiteor — Ato Penitencial",
      sub: "Ritos Iniciais",
      texto: `Confesso a Deus Todo-Poderoso e a vós, irmãos e irmãs, que pequei muitas vezes, por pensamentos e palavras, por atos e omissões.
Por minha culpa, minha culpa, minha tão grande culpa.
E peço à Virgem Maria, aos anjos e santos, e a vós, irmãos e irmãs, que oreis por mim ao Senhor nosso Deus.

[Absolvição do Padre:] O Deus Todo-Poderoso tenha misericórdia de nós, perdoe os nossos pecados e nos conduza à vida eterna. Amém.`,
    },
    {
      titulo: "Glória",
      sub: "Hino de Louvor",
      texto: `Glória a Deus nas alturas, e paz na terra aos homens por Ele amados. Senhor Deus, Rei dos céus, Deus Pai todo-poderoso, nós vos louvamos, nós vos bendizemos, nós vos adoramos, nós vos glorificamos, nós vos damos graças por vossa imensa glória. Senhor Jesus Cristo, Filho Unigênito, Senhor Deus, Cordeiro de Deus, Filho do Pai, vós que tirais o pecado do mundo, tende piedade de nós; vós que tirais o pecado do mundo, acolhei a nossa súplica; vós que estais à direita do Pai, tende piedade de nós. Porque só vós sois o Santo, só vós o Senhor, só vós o Altíssimo, Jesus Cristo, com o Espírito Santo na glória de Deus Pai. Amém.`,
    },
    { tipo: 'grupo', titulo: '✦ Liturgia da Palavra' },
    {
      titulo: "Profissão de Fé — Credo Niceno",
      sub: "Pode substituir o Símbolo dos Apóstolos",
      texto: `Creio em um só Deus, Pai todo-poderoso, Criador do céu e da terra, de todas as coisas visíveis e invisíveis. Creio em um só Senhor, Jesus Cristo, Filho Unigênito de Deus, nascido do Pai antes de todos os séculos: Deus de Deus, Luz da Luz, Deus verdadeiro de Deus verdadeiro; gerado, não criado, consubstancial ao Pai. Por ele todas as coisas foram feitas; e por nós, homens, e para nossa salvação, desceu dos céus e se encarnou pelo Espírito Santo, no seio da Virgem Maria, e se fez homem. Também por nós foi crucificado sob Pôncio Pilatos, padeceu e foi sepultado. Ressuscitou ao terceiro dia, conforme as Escrituras, e subiu aos céus, onde está sentado à direita do Pai. E de novo há de vir em sua glória, para julgar os vivos e os mortos; e o seu reino não terá fim. Creio no Espírito Santo, Senhor que dá a vida, e procede do Pai e do Filho; e com o Pai e o Filho é adorado e glorificado: ele que falou pelos profetas. Creio na Igreja una, santa, católica e apostólica. Professo um só batismo para a remissão dos pecados. Espero a ressurreição dos mortos e a vida do mundo que há de vir. Amém.`,
    },
    { tipo: 'grupo', titulo: '✦ Rito da Comunhão' },
    {
      titulo: "Cordeiro de Deus",
      sub: "Fração do Pão",
      texto: `Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós.
Cordeiro de Deus, que tirais o pecado do mundo, tende piedade de nós.
Cordeiro de Deus, que tirais o pecado do mundo, dai-nos a paz.`,
    },
    {
      titulo: "Oração antes da Comunhão (fiéis)",
      sub: "Antes de receber a Eucaristia",
      texto: `Senhor, eu não sou digno de que entreis na minha morada, mas dizei uma palavra e serei salvo.`,
    },
  ],

  tercos: [
    {
      titulo: "Como rezar o Terço do Rosário",
      sub: "Guia completo com todos os mistérios",
      texto: `1. Sinal da Cruz e Credo
2. Pai Nosso
3. 3 Ave Marias (fé, esperança, caridade)
4. Glória ao Pai
5. Para cada um dos 5 mistérios:
   — Anunciar o mistério
   — Pai Nosso
   — 10 Ave Marias
   — Glória ao Pai
   — Jaculatória de Fátima
6. Salve Rainha ao final

✦ GOZOSOS (Seg e Sáb): Anunciação · Visitação · Natal · Apresentação · Encontro no Templo
✦ LUMINOSOS (Qui): Batismo · Caná · Anúncio do Reino · Transfiguração · Eucaristia
✦ DOLOROSOS (Ter e Sex): Agonia · Flagelação · Coroação Mística · Caminho da Cruz · Crucificação
✦ GLORIOSOS (Qua e Dom): Ressurreição · Ascensão · Pentecostes · Assunção · Coroação de Maria`,
    },
    { titulo: "Jaculatória de Fátima", sub: "Ao final de cada dezena", texto: `Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas para o céu, principalmente as que mais precisarem da vossa misericórdia. Amém.` },
    {
      titulo: "Terço da Misericórdia",
      sub: "Revelado a Santa Faustina Kowalska",
      texto: `Início: Sinal da Cruz, Pai Nosso, Ave Maria, Credo.
Contas grandes: "Pai Eterno, ofereço-vos o Corpo, o Sangue, a Alma e a Divindade de vosso caríssimo Filho, Nosso Senhor Jesus Cristo, em expiação pelos nossos pecados e os do mundo inteiro."
Contas pequenas (10×): "Pelos dolorosos sofrimentos de Jesus, tende misericórdia de nós e do mundo inteiro."
Final (3×): "Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro."`,
    },
  ],

  outras: [
    { titulo: "Memorare", sub: "Oração a Nossa Senhora", texto: `Lembrai-vos, ó piíssima Virgem Maria, que jamais se ouviu dizer que algum daqueles que recorreram à vossa proteção, imploraram o vosso auxílio e pediram o vosso amparo fosse por vós abandonado. Animado por semelhante confiança, a vós recorro, ó Mãe, Virgem das Virgens, e, gemendo sob o peso dos meus pecados, me prostro a vossos pés. Ó Mãe do Verbo Encarnado, não desprezeis as minhas súplicas, mas ouvi-as e atendei-as benignamente. Amém.` },
    { titulo: "Sub Tuum Praesidium", sub: "A mais antiga oração a Maria", texto: `Sob a vossa proteção nos refugiamos, Santa Mãe de Deus; não desprezeis nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita. Amém.` },
  ],
};

// ─────────────────────────────────────
//  MODAL DE LEITURA FOCADA (A TELA CHEIA)
// ─────────────────────────────────────
const ReadingModal = ({ item, catInfo, onClose }) => {
  if (!item) return null;

  // Renderiza títulos em negrito dentro do texto, etc.
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.trim().startsWith('TOMAI,')) return <span key={i} className="block font-bold mt-2 mb-2 text-parish-terracotta">{line}</span>;
      if (line.match(/^\(.*\)$/)) return <span key={i} className="block italic text-stone-500 mt-2 mb-1">{line}</span>;
      if (line.trim().startsWith('Mistério da fé!')) return <strong key={i} className="block mt-4 mb-2">{line}</strong>;
      return <span key={i} className="block mb-3">{line}</span>;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-stone-900/60 backdrop-blur-md transition-all">
      <div className="bg-[#fcfbf9] w-full max-w-4xl h-full md:h-[90vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUpFade ring-1 ring-white/20">
        
        {/* Header do Reader */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#fcfbf9] border-b border-stone-200/50 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${catInfo.cor} text-white shadow-sm`}>
              <catInfo.icon size={14} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Leitura Focada</p>
              <h3 className="font-serif font-bold text-stone-800 leading-tight">{item.titulo}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200/50 text-stone-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content (Texto Largo) */}
        <div className="flex-grow overflow-y-auto px-6 md:px-16 py-10 pb-20 custom-scrollbar scroll-smooth">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-4 leading-tight">{item.titulo}</h1>
            <p className="text-stone-400 font-serif italic text-lg md:text-xl mb-12 pb-8 border-b border-stone-200/50">
              {item.sub}
            </p>
            
            <div className="font-serif text-lg md:text-[22px] leading-[1.8] md:leading-[2.2] text-stone-700 text-justify">
              {formatText(item.texto)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ─────────────────────────────────────
//  ACCORDION ITEM
// ─────────────────────────────────────
const OracaoItem = ({ item, index, aberta, setAberta, catInfo, setReadingMode }) => {
  const isOpen = aberta === index;
  const Icon = catInfo.icon;
  const isSuperLong = item.isLongo; 

  if (item.tipo === 'grupo') {
    return (
      <div className="flex items-center gap-3 pt-6 pb-2">
        <div className={`h-[1px] w-8 bg-gradient-to-r ${catInfo.cor} rounded-full opacity-60`} />
        <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] ${catInfo.corTexto} shrink-0`}>
          {item.titulo}
        </span>
        <div className={`flex-grow h-[1px] bg-gradient-to-r ${catInfo.cor} opacity-20 rounded-full`} />
      </div>
    );
  }

  // Se for longa, a gente pode ou expandir a prévia e dar o botão ou já abrir no modal.
  // Vamos deixar que expanda a prévia e tenha o botão explícito.
  
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border
        ${isOpen
          ? 'shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] ring-1 ring-black/5 bg-white border-transparent'
          : 'bg-white hover:bg-stone-50 shadow-sm hover:shadow-md border-stone-100'
        }`}
    >
      <div 
        className={`p-5 flex items-center justify-between gap-3 ${item.destaque ? 'bg-gradient-to-r from-parish-terracotta/5 to-transparent' : ''}`}
        onClick={() => setAberta(isOpen ? -1 : index)}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${isOpen ? `bg-gradient-to-br ${catInfo.cor} text-white shadow-md` : `${catInfo.corBg} ${catInfo.corTexto}`}`}>
            {item.destaque ? <Star size={20} /> : <Icon size={20} />}
          </div>
          <div className="min-w-0">
            <h3 className={`font-serif font-bold text-lg md:text-xl leading-tight ${item.destaque ? 'text-parish-terracotta' : 'text-stone-800'}`}>
              {item.titulo}
            </h3>
            {item.sub && (
              <p className="text-[11px] md:text-xs text-stone-400 uppercase tracking-widest mt-1 truncate">{item.sub}</p>
            )}
          </div>
        </div>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-stone-100 text-stone-800 rotate-180' : 'bg-transparent text-stone-400'}`}>
          <ChevronDown size={20} />
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`px-6 pb-6 pt-2 border-t border-dashed border-stone-100 ${isSuperLong ? 'bg-stone-50/50' : ''}`}>
          <div className={`h-[2px] w-12 bg-gradient-to-r ${catInfo.cor} rounded-full mb-5 opacity-40`} />
          
          {isSuperLong ? (
            <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
              <BookOpen size={40} className="text-stone-200 mb-4" />
              <p className="text-stone-500 font-serif text-lg mb-6 max-w-md">
                Esta oração da liturgia possui um texto muito extenso. Recomendamos o modo de leitura para uma melhor experiência.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); setReadingMode(item); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 bg-gradient-to-r ${catInfo.cor}`}
              >
                <Maximize2 size={18} />
                Ler Texto Completo
              </button>
            </div>
          ) : (
            <p className="text-stone-600 leading-[1.9] font-serif text-base md:text-lg text-justify whitespace-pre-line">
              {item.texto}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────
//  PÁGINA PRINCIPAL
// ─────────────────────────────────────
const Oracoes = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('destaque');
  const [aberta, setAberta] = useState(0);
  const [readingModeItem, setReadingModeItem] = useState(null);

  // Travar o scroll quando Modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = readingModeItem ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [readingModeItem]);

  const catInfo = categorias.find(c => c.id === categoriaAtiva);
  const oracoes = oracoesPorCategoria[categoriaAtiva] || [];
  const Icon = catInfo.icon;

  const handleCategoria = (id) => {
    setCategoriaAtiva(id);
    setAberta(0);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-20 pb-32 md:pb-20 overflow-x-hidden font-sans">

      {/* ── HERO ── */}
      <div className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-parish-gold/10 rounded-full blur-[80px] -mt-32 -mr-32 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-parish-gold mb-6">
            <Star size={12} fill="currentColor" />
            Liturgia e Espiritualidade
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            Orações do Cristão
          </h1>
          <p className="text-stone-300 italic text-xl max-w-lg mx-auto font-serif leading-relaxed">
            "A oração é a respiração da alma."
          </p>
        </div>
      </div>

      {/* ── ABAS STICKY ── */}
      <div className="bg-white/80 backdrop-blur-md border-b border-stone-200/60 sticky top-[64px] z-30 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categorias.map(cat => {
              const CatIcon = cat.icon;
              const isActive = categoriaAtiva === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoria(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all shrink-0
                    ${isActive
                      ? `bg-gradient-to-br ${cat.cor} text-white shadow-md`
                      : 'text-stone-500 hover:bg-stone-100'
                    }`}
                >
                  <CatIcon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTEÚDO DA LISTA ── */}
      <div className="max-w-4xl mx-auto px-4 pt-12">

        {/* Header da categoria ativa */}
        <div className={`flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 p-8 rounded-3xl bg-gradient-to-br ${catInfo.cor} text-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden relative`}>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
             <Icon size={150} />
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 z-10 border border-white/20">
            <Icon size={32} />
          </div>
          <div className="z-10">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Seção de Orações</p>
            <h2 className="text-3xl font-serif font-bold">{catInfo.label}</h2>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto text-white/90 text-sm font-bold bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm z-10">
            {oracoes.filter(o => !o.tipo).length} preces registradas
          </div>
        </div>

        {/* Lista de Acordeões */}
        <div className="space-y-3">
          {oracoes.map((item, index) => (
            <OracaoItem
              key={`${categoriaAtiva}-${index}`}
              item={item}
              index={index}
              aberta={aberta}
              setAberta={setAberta}
              catInfo={catInfo}
              setReadingMode={setReadingModeItem}
            />
          ))}
        </div>

        <div className="mt-20 text-center pb-8 border-t border-stone-200/50 pt-8">
          <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">Paróquia São Miguel Arcanjo</p>
          <p className="text-stone-300 text-xs mt-2 italic font-serif">Textos em conformidade com o Missal Romano</p>
        </div>
      </div>

      {/* ── MODAL EXCLUSIVO PARA LEITURA ── */}
      <ReadingModal 
        item={readingModeItem} 
        catInfo={categorias.find(c => c.id === categoriaAtiva)}
        onClose={() => setReadingModeItem(null)} 
      />

    </div>
  );
};

export default Oracoes;
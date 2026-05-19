import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Layers, CircleDot, Wheat, BookOpen, Sparkles, Maximize2, X } from 'lucide-react';

// ─────────────────────────────────────
//  CATEGORIAS
// ─────────────────────────────────────
const categorias = [
  { id: 'destaque', label: 'São Miguel', icon: Star, cor: 'from-parish-terracotta to-[#a0422a]', corBg: 'bg-parish-terracotta/10', corTexto: 'text-parish-terracotta' },
  { id: 'padroeiros', label: 'Padroeiros', icon: Sparkles, cor: 'from-[#8b5cf6] to-[#5b21b6]', corBg: 'bg-purple-50', corTexto: 'text-purple-800' },
  { id: 'basicas', label: 'Cotidianas', icon: BookOpen, cor: 'from-[#3b6fa0] to-[#2a5480]', corBg: 'bg-blue-50', corTexto: 'text-blue-700' },
  { id: 'missa', label: 'Missa', icon: Layers, cor: 'from-parish-brown to-[#5a3e28]', corBg: 'bg-amber-50', corTexto: 'text-amber-800' },
  { id: 'tercos', label: 'Terços', icon: CircleDot, cor: 'from-[#3a6b4a] to-[#2a5038]', corBg: 'bg-green-50', corTexto: 'text-green-800' },
];

// Textos Auxiliares para Orações Longas (Para não quebrar a sintaxe do JSX)
const textoOEI = `(Tradição Romana)
PR: O Senhor esteja convosco.
T: Ele está no meio de nós.
PR: Corações ao alto.
T: O nosso coração está em Deus.
PR: Demos graças ao Senhor, nosso Deus.
T: É nosso dever e nossa salvação.

(Segue-se conforme as rúbricas, o prefácio, com a conclusão:)
T: Santo, Santo, Santo, Senhor, Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!

(O sacerdote, de braços abertos diz:)
PR: Pai de misericórdia, a quem sobem nossos louvores, suplicantes, vos rogamos e pedimos por Jesus Cristo, vosso filho e Senhor nosso, 
(une as mãos e traça o sinal da cruz, ao mesmo tempo sobre o pão e o cálice, dizendo:)
PR: que aceiteis e abençoeis ✠ estes dons, estas oferendas, este sacríficio puro e santo,
(de braços abertos, prossegue:)
PR: que oferecemos, antes de tudo, pela vossa Igreja santa e católica: concedei-lhe paz e proteção, unindo-a num só corpo e governando-a por toda a terra, em comunhão com vosso servo o Papa N., o nosso Bispo N., e todos os que guardam a fé católica que receberam dos Apóstolos.
(A assembleia aclama:)
T: Abençoai nossa oferenda, ó Senhor!

(Memento dos vivos)
PR: Lembrai-vos, ó Pai, dos vossos filhos e filhas N. N.
(Une as mãos e reza por alguns momentos em silêncio por aqueles que quer recordar.)
(De braços abertos, prossegue:)
PR: e de todos os que circundam este altar, dos quais conheceis a fé e a dedicação ap vosso serviço. Por eles nós vos oferecemos e também eles vos oferecem este sacríficio de louvor por si e por todos os seus, e elevam a vós as suas preces, Deus eterno, vivo e verdadeiro, para alcançar o perdão de suas faltas, a segurança em suas vidas e a salvação que esperam.
(A assembleia aclama:)
T: Lembrai-vos, ó Pai, dos vossos filhos!

("Infra actionem")
PR: Em comunhão com toda a Igreja, celebramos em primeiro lugar a memória da Mãe de nosso Deus e Senhor Jesus Cristo, a gloriosa sempre Virgem Maria, a de seu esposo São José, e também a dos Santos Apóstolos e Mártires: Pedro e Paulo, André, (Tiago e João, Tomé, Tiago e Filipe, Bartolomeu e Mateus, Simão e Tadeu, Lino, Cleto, Clemente, Sisto, Cornélio e Cipriano, Lourenço e Crisógono, João e Paulo, Cosme e Damião) e a de todos os vossos Santos. Por seus méritos e preces concedei-nos sem cessar a vossa proteção. 
(A assembleia aclama:)
T: Em comunhão com vossos Santos vos louvamos!

(O sacerdote, com os braços abertos, continua:)
PR: Aceitai, ó Pai, com bondade, a oblação dos vossos servos e de toda a vossa família; dai-nos sempre a vossa paz, livrai-nos da condenação eterna e acolhei-nos entre os vossos eleitos.
(Une as mãos.)

(Estendendo as mãos sobre as oferendas, diz:)
PR: Dignai-vos, ó Pai, aceitar, abençoar e santificar estas oferendas, recebei-as como sacrifício espiritual perfeito, a fim de que se tornem para nós o Corpo e o Sangue de vosso amado Filho, nosso Senhor Jesus Cristo.
(Une as mãos.)
(A assembleia aclama:)
T: Enviai o vosso Espírito Santo!

(O relato da instituição da Eucaristia seja proferido de modo claro e audível, como requer a sua natureza.)
PR: Na véspera de sua paixão,
(toma o pão e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: ele tomou o pão em suas santas e veneráveis mãos, 
(eleva os olhos,)
PR: elevou os olhos ao céu, a vós, ó Pai todo-poderoso, pronunciou a benção de ação de graças, partiu o pão e deu a seus discípulos dizendo:
(inclina-se levemente)
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.
(Mostra ao povo a hóstia consagrada, coloca-a na patena e genuflete em adoração.)

(Então prossegue:)
PR: Do mesmo modo, no fim da ceia, 
(toma o cálice nas mãos e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: ele tomou este precioso cálice em suas santas e veneráveis mãos, pronunciou novamente a benção de ação de graças e o deu a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.
(Mostra o cálice ao povo, coloca-o sobre o corporal e genuflete em adoração.)

(Em seguida, diz:)
PR: Mistério da fé!
(A assembleia aclama:)
T: Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!
(ou)
PR: Mistério da fé e do amor!
(A assembleia aclama:)
T: Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!
(ou)
PR: Mistério da fé para a salvação do mundo!
(A assembleia aclama:)
T: Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.

(O sacerdote, de braços abertos, diz:)
PR: Celebrando, pois, a memória da bem-aventurada paixão do vosso Filho, da sua ressurreição dentre os mortos e gloriosa ascensão aos céus, nós, vossos servos, e também vosso povo santo, vos oferecemos, ó Pai, dentre os bens que nos destes, o sacrifício puro, santo e imaculado, Pão santo da vida eterna e Cálice da perpétua salvação.
PR: Recebei, ó Pai, com olhar benigno, esta oferenda, como recebestes os dons do justo Abel, o sacrifício de nosso patriarca Abraão e a oblação pura e santa do sumo sacerdote Melquisedeque.
(A assembleia aclama:)
T: Aceitai, ó Senhor, a nossa oferta!

(Une as mãos e, inclinando-se, diz:)
PR: Suplicantes, vos pedimos, ó Deus onipotente, que esta nossa oferenda seja levada à vossa presença, no altar do céu, pelas mãos do vosso santo Anjo, para que todos nós, participando deste altar pela comunhão do santíssimo Corpo e Sangue do vosso Filho,
(ergue-se e faz sobre si o sinal da cruz, dizendo:)
PR: sejamos repletos de todas as graças e bênçãos do céu.
(Une as mãos.)
(A assembleia aclama:)
T: O Espírito nos una num só corpo! 

(Memento dos mortos.)
(De braços abertos, diz:)
PR: Lembrai-vos, ó Pai, dos vossos filhos e filhas N. N., que nos precederam com o sinal da fé e dormem o sono da paz.
(Une as mãos e, em silêncio, reza brevemente pelos defuntos que deseja recordar.)
(De braços abertos, prossegue:)
PR: A eles, e a todos os que descansam no Cristo, concedei o repouso, a luz e a paz.
(Une as mãos.)
(A assembleia aclama:)
T: Concedei-lhes, ó Senhor, a luz eterna!

(Bate no peito, dizendo:)
PR: E a todos nós pecadores, 
(e, de braços abertos, prossegue:)
que esperamos na vossa infinita misericórdia, concedei, não por nossos méritos, mas por vossa bondade, o convívio dos Apóstolos e Mártires: João Batista e Estêvão, Matias e Barnabé, (Inácio, Alexandre, Marcelino e Pedro, Felicidade e Perpétua, Águeda e Luzia, Inês, Cecília, Anastácia) e de todos os vossos Santos.
(Une as mãos.)
Por Cristo nosso Senhor.
(E prossegue:)
Por ele não cessais de criar, santificar, vivificar, abençoar estes bens e distribuí-los entre nós.

(Ergue a patena com a hóstia e o cálice, dizendo:)
Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.
(A assembleia aclama:)
T: Amém.

(Segue-se o Rito da Comunhão.)`;

const textoOEII = `(A mais antiga - para dias de semana)
(Embora tenha prefácio próprio, esta Oracão Eucarística pode ser usada também com outros prefácios, sobretudo aqueles que de maneira sucinta apresentem o mistério da salvação, por exemplo, os prefácios comuns.)
PR: O Senhor esteja convosco.
T: Ele está no meio de nós.
PR: Corações ao alto.
T: O nosso coração está em Deus.
PR: Demos graças ao Senhor, nosso Deus.
T: É nosso dever e nossa salvação.

PR: Na verdade, é digno e justo, é nosso dever e salvação dar-vos graças sempre e em todo lugar, Senhor, Pai santo, por vosso amado Filho, Jesus Cristo.
PR: Ele é a vossa Palavra, pela qual tudo criastes. Ele é o nosso Salvador e Redentor, que se encarnou pelo Espírito Santo e nasceu da Virgem Maria. Ele, para cumprir a vossa vontade e adquirir para vós um povo santo, estendeu os braços na hora da sua paixão, a fim de vencer a morte e manifestar a ressurreição.
PR: Por isso, com os Anjos e todos os Santos, proclamamos vossa glória, cantando (dizendo) a uma só voz:
T: Santo, Santo, Santo, Senhor Deus do universo. O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!

(O sacerdote, de braços abertos, diz:)
PR: Na verdade, ó Pai, vós sois Santo, fonte de toda santidade.
(Une as mãos e, estendendo-as sobre as oferendas, diz:)
PR: Santificai, pois, estes dons, derramando sobre eles o vosso Espírito,
(une as mãos e traça o sinal da cruz, ao mesmo tempo sobre o pão e o cálice, dizendo:)
PR: a fim de que se tornem para nós o Corpo e ✠ o Sangue de nosso Senhor Jesus Cristo.
(Une as mãos.)
(A assembleia aclama:)
T: Enviai o vosso Espírito Santo!

(O relato da instituição da Eucaristia seja proferido de modo claro e audível como requer a sua natureza.)
PR: Estando para ser entregue e abraçando livremente a paixão,
(toma o pão e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: Jesus tomou o pão, pronunciou a bênção de ação de graças, partiu e o deu a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.
(Mostra ao povo a hóstia consagrada, coloca-a na patena e genuflete em adoração.)

(Então prossegue:)
PR: Do mesmo modo, no fim da Ceia,
(toma o cálice nas mãos e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: ele tomou o cálice em suas mãos e, dando graças novamente, o entregou a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.
(Mostra o cálice ao povo, coloca-o sobre o corporal e genuflete em adoração.)

(Em seguida, diz:)
PR: Mistério da fé!
(A assembleia aclama:)
T: Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!
(ou)
PR: Mistério da fé e do amor!
(A assembleia aclama:)
T: Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!
(ou)
PR: Mistério da fé para a salvação do mundo!
(A assembleia aclama:)
T: Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.

(O sacerdote, de braços abertos, diz:)
PR: Celebrando, pois, o memorial da morte e ressurreição do vosso Filho, nós vos oferecemos, ó Pai, o Pão da vida e o Cálice da salvação; e vos agradecemos porque nos tornastes dignos de estar aqui na vossa presença e vos servir.
(A assembleia aclama:)
T: Aceitai, ó Senhor, a nossa oferta!

PR: Suplicantes, vos pedimos que, participando do Corpo e Sangue de Cristo, sejamos reunidos pelo Espírito Santo num só corpo.
(A assembleia aclama:)
T: O Espírito nos una num só corpo!

PR: Lembrai-vos, ó Pai, da vossa Igreja que se faz presente pelo mundo inteiro; ★ que ela cresça na caridade, em comunhão com o Papa N., com o nosso Bispo N., os bispos do mundo inteiro, os presbíteros, os diáconos e todos os ministros do vosso povo.
(A assembleia aclama:)
T: Lembrai-vos, ó Pai, da vossa Igreja!

PR: Lembrai-vos também, na vossa misericórdia, dos (outros) nossos irmãos e irmãs que adormeceram na esperança da ressurreição e de todos os que partiram desta vida; acolhei-os junto a vós na luz da vossa face.
(A assembleia aclama:)
T: Concedei-lhes, ó Senhor, a luz eterna!

PR: Enfim, nós vos pedimos, tende piedade de todos nós e dai-nos participar da vida eterna, com a Virgem Maria, Mãe de Deus, São José, seu esposo, os Apóstolos, (São N.: Santo do dia ou padroeiro) e todos os Santos que neste mundo viveram na vossa amizade, a fim de vos louvarmos e glorificarmos
(une as mãos)
PR: por Jesus Cristo, vosso Filho.

(Ergue a patena com a hóstia e o cálice, dizendo:)
PR: Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.
(A assembleia aclama:)
T: Amém.

(Segue-se o Rito da Comunhão.)`;

const textoOEIII = `(Ação de graças - para Domingos)
PR: O Senhor esteja convosco.
T: Ele está no meio de nós.
PR: Corações ao alto.
T: O nosso coração está em Deus.
PR: Demos graças ao Senhor, nosso Deus.
T: É nosso dever e nossa salvação.

(Segue-se conforme as rubricas, o prefácio, com a conclusão:)
T: Santo, Santo, Santo, Senhor, Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!

(O sacerdote, de braços abertos, diz:)
PR: Na verdade, vós sois Santo, ó Deus do universo, e tudo o que criastes proclama o vosso louvor, porque, por Jesus Cristo, vosso Filho e Senhor nosso, e pela força do Espírito Santo, dais vida e santidade a todas as coisas e não cessais de reunir para vós um povo que vos ofereça em toda parte, do nascer ao pôr do sol, um sacrifício perfeito.

(Une as mãos e, estendendo-as sobre as oferendas, diz:)
PR: Por isso, ó Pai, nós vos suplicamos: santificai pelo Espírito Santo as oferendas que vos apresentamos para serem consagradas
(une as mãos e traça o sinal da cruz, ao mesmo tempo sobre o pão e o cálice, dizendo:)
PR: a fim de que se tornem o Corpo e ✠ o Sangue de vosso Filho, nosso Senhor Jesus Cristo,
(une as mãos)
PR: que nos mandou celebrar estes mistérios.
(A assembleia aclama:)
T: Enviai o vosso Espírito Santo!

(O relato da instituição da Eucaristia seja proferido de modo claro e audível como requer a sua natureza.)
PR: Na noite em que ia ser entregue,
(toma o pão e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: Jesus tomou o pão, pronunciou a bênção de ação de graças, partiu e o deu a seus discípulos, dizendo: 
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.
(Mostra ao povo a hóstia consagrada, coloca-a na patena e genuflete em adoração.)

(Então prossegue:)
PR: Do mesmo modo, no fim da Ceia,
(toma o cálice nas mãos e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: ele tomou o cálice em suas mãos, pronunciou a bênção de ação de graças, e o deu a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.
(Mostra o cálice ao povo, coloca-o sobre o corporal e genuflete em adoração.)

(Em seguida, diz:)
PR: Mistério da fé!
(A assembleia aclama:)
T: Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!
(ou)
PR: Mistério da fé e do amor!
(A assembleia aclama:)
T: Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!
(ou)
PR: Mistério da fé para a salvação do mundo!
(A assembleia aclama:)
T: Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.

(O sacerdote, de braços abertos, diz:)
PR: Celebrando agora, ó Pai, o memorial da paixão redentora do vosso Filho, da sua gloriosa ressurreição e ascensão ao céu, e enquanto esperamos sua nova vinda, nós vos oferecemos em ação de graças este sacrifício vivo e santo.
(A assembleia aclama:)
T: Aceitai, ó Senhor, a nossa oferta!

PR: Olhai com bondade a oblação da vossa Igreja e reconhecei nela o sacrifício que nos reconciliou convosco; concedei que, alimentando-nos com o Corpo e o Sangue do vosso Filho, repletos do Espírito Santo, nos tornemos em Cristo um só corpo e um só espírito.
(A assembleia aclama:)
T: O Espírito nos una num só corpo!

PR: Que o mesmo Espírito faça de nós uma eterna oferenda para alcançarmos a herança com os vossos eleitos: a santíssima Virgem Maria, Mãe de Deus, São José, seu esposo, os vossos santos Apóstolos e gloriosos Mártires, (Santo do dia ou padroeiro) e todos os Santos, que não cessam de interceder por nós na vossa presença.
(A assembleia aclama:)
T: Fazei de nós uma perfeita oferenda!

PR: Nós vos suplicamos, Senhor, que este sacrifício da nossa reconciliação estenda a paz e a salvação ao mundo inteiro. Confirmai na fé e na caridade a vossa Igreja que caminha neste mundo com o vosso servo o Papa N. e o nosso Bispo N., com os bispos do mundo inteiro, os presbíteros e diáconos, os outros ministros e o povo por vós redimido.
PR: ★ Atendei propício às preces desta família, que reunistes em vossa presença. Reconduzi a vós, Pai de misericórdia, todos os vossos filhos e filhas dispersos pelo mundo inteiro.
(A assembleia aclama:)
T: Lembrai-vos, ó Pai, da vossa Igreja!

PR: Acolhei com bondade no vosso reino os nossos irmãos e irmãs que partiram desta vida e todos os que morreram na vossa amizade. Unidos a eles, esperamos também nós saciar-nos eternamente da vossa glória,
(une as mãos)
PR: por Cristo, Senhor nosso. Por ele dais ao mundo todo bem e toda graça.

(Ergue a patena com a hóstia e o cálice, dizendo:)
PR: Por Cristo, com Cristo, em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.
T: Amém!

(Segue-se o Rito da Comunhão.)`;

const textoOEIV = `(História da Salvação)
(Este prefácio não pode ser substituído por outro, porque introduz a Oração Eucarística cuja estrutura apresenta um resumo da História da Salvação.)
PR: O Senhor esteja convosco.
T: Ele está no meio de nós.
PR: Corações ao alto.
T: O nosso coração está em Deus.
PR: Demos graças ao Senhor, nosso Deus.
T: É nosso dever e nossa salvação.

PR: Na verdade, ó Pai, é nosso dever dar-vos graças, é nossa salvação dar-vos glória. Só vós sois o Deus vivo e verdadeiro que existis antes de todo o tempo e permaneceis para sempre, habitando em luz inacessível.
PR: Mas, porque sois o Deus de bondade e a fonte da vida, fizestes todas as coisas para cobrir de bênçãos as vossas criaturas e a muitos alegrar com o esplendor da vossa luz.
PR: Eis, pois, diante de vós os inumeráveis coros dos Anjos que dia e noite vos servem e, contemplando a glória da vossa face, vos louvam sem cessar. Com eles também nós e, por nossa voz, tudo o que criastes celebramos vosso Nome e, exultantes de alegria, cantamos (dizemos) a uma só voz:
T: Santo, Santo, Santo, Senhor Deus do universo. O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!

(O sacerdote, de braços abertos, diz:)
PR: Nós proclamamos vossa grandeza, Pai santo, a sabedoria e o amor com que fizestes todas as coisas. Criastes o ser humano à vossa imagem e lhe confiastes todo o universo, para que, servindo somente a vós, seu Criador, cuidasse de toda criatura. E quando pela desobediência perdeu a vossa amizade, não o abandonastes ao poder da morte. A todos, porém, socorrestes com misericórdia, para que, ao procurar-vos, vos encontrassem. Muitas vezes oferecestes aliança à família humana e a instruístes pelos profetas na esperança da salvação.
(A assembleia aclama:)
T: A todos socorrestes com bondade!

PR: E de tal modo, Pai santo, amastes o mundo que, chegada a plenitude dos tempos, nos enviastes vosso próprio Filho para ser o nosso Salvador. Encarnado pelo poder do Espírito Santo e nascido da Virgem Maria, Jesus viveu em tudo a condição humana, menos o pecado; anunciou aos pobres a salvação, aos oprimidos, a liberdade, aos tristes, a alegria. Para cumprir o vosso plano de amor, entregou-se à morte e, ressuscitando, destruiu a morte e renovou a vida.
(A assembleia aclama:)
T: Por amor nos enviastes vosso Filho!

PR: E, a fim de não mais vivermos para nós, mas para ele, que por nós morreu e ressuscitou, enviou de vós, ó Pai, como primeiro dom aos vossos fiéis, o Espírito Santo, que continua sua obra no mundo para levar à plenitude toda a santificação.

(Une as mãos e, estendendo-as sobre as oferendas, diz:)
PR: Por isso, nós vos pedimos, ó Pai, que o mesmo Espírito Santo santifique estas oferendas,
(une as mãos e traça o sinal da cruz, ao mesmo tempo sobre o pão e o cálice, dizendo:)
PR: a fim de que se tornem o Corpo e ✠ o Sangue de Jesus Cristo, vosso Filho e Senhor nosso,
(une as mãos)
PR: para celebrarmos este grande mistério que ele nos deixou em sinal da eterna aliança.
(A assembleia aclama:)
T: Enviai o vosso Espírito Santo!

(O relato da instituição da Eucaristia seja proferido de modo claro e audível como requer a sua natureza.)
PR: Quando, pois, chegou a hora em que por vós, ó Pai, ia ser glorificado, tendo amado os seus que estavam no mundo, amou-os até o fim. Enquanto ceavam,
(toma o pão e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: Jesus tomou o pão, pronunciou a bênção de ação de graças, partiu e o deu a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.
(Mostra ao povo a hóstia consagrada, coloca-a na patena e genuflete em adoração.)

(Então prossegue:)
PR: Do mesmo modo,
(toma o cálice nas mãos e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: ele tomou em suas mãos o cálice com vinho, deu-vos graças novamente, e o deu a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.
(Mostra o cálice ao povo, coloca-o sobre o corporal e genuflete em adoração.)

(Em seguida, diz:)
PR: Mistério da fé!
(A assembleia aclama:)
T: Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!
(ou)
PR: Mistério da fé e do amor!
(A assembleia aclama:)
T: Todas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!
(ou)
PR: Mistério da fé para a salvação do mundo!
(A assembleia aclama:)
T: Salvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.

(O sacerdote, de braços abertos, diz:)
PR: Celebrando, agora, ó Pai, o memorial da nossa redenção, anunciamos a morte de Cristo e sua descida entre os mortos, proclamamos a sua ressurreição e ascensão à vossa direita e, esperando a sua vinda gloriosa, nós vos oferecemos o seu Corpo e Sangue, sacrifício do vosso agrado e salvação para o mundo inteiro.
(A assembleia aclama:)
T: Aceitai, ó Senhor, a nossa oferta!

PR: Olhai, com bondade, a oblação que destes à vossa Igreja e concedei aos que vamos participar do mesmo pão e do mesmo cálice que, reunidos pelo Espírito Santo num só corpo, nos tornemos em Cristo uma oferenda viva para o louvor da vossa glória.
(A assembleia aclama:)
T: O Espírito nos una num só corpo!

PR: E agora, ó Pai, lembrai-vos de todos pelos quais vos oferecemos este sacrifício: o vosso servo o Papa N., o nosso Bispo N., os bispos do mundo inteiro, os presbíteros, os diáconos, e todos os ministros da vossa Igreja, os fiéis que, ao redor deste altar, se unem à nossa oferta, o povo que vos pertence e aqueles que vos procuram de coração sincero.
(A assembleia aclama:)
T: Lembrai-vos, ó Pai, da vossa Igreja!

PR: Lembrai-vos também dos que morreram na paz do vosso Cristo e de todos os defuntos dos quais só vós conhecestes a fé.
(A assembleia aclama:)
T: Concedei-lhes, ó Senhor, a luz eterna!

PR: E a todos nós, vossos filhos e filhas, concedei, ó Pai de bondade, alcançar a herança eterna, com a Virgem Maria, Mãe de Deus, São José, seu esposo, os Apóstolos e todos os Santos, no vosso reino, onde, com todas as criaturas, libertas da corrupção do pecado e da morte, vos glorificaremos,
(une as mãos)
PR: por Cristo, Senhor nosso, por quem dais ao mundo todo bem e toda graça.

(Ergue a patena com a hóstia e o cálice, dizendo:)
PR: Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.
(A assembleia aclama:)
T: Amém.

(Segue-se o Rito da Comunhão.)`;

const textoOEV = `(Do Congresso de Manaus)
(O prefácio não pode ser substituído por outro.)
PR: O Senhor esteja convosco.
T: Ele está no meio de nós.
PR: Corações ao alto.
T: O nosso coração está em Deus.
PR: Demos graças ao Senhor, nosso Deus.
T: É nosso dever e nossa salvação.

PR: É justo e nos faz todos ser mais santos, louvar a vós, ó Pai, no mundo inteiro, de dia e de noite, agradecendo com Cristo, vosso Filho, nosso irmão.
PR: É ele o sacerdote verdadeiro que sempre se oferece por nós todos, mandando que se faça a mesma coisa que fez naquela Ceia derradeira.
PR: Por isso, aqui estamos reunidos, louvando e agradecendo com alegria, juntando nossa voz à voz dos Anjos e dos Santos todos, para cantar (dizer):
T: Santo, Santo, Santo, Senhor Deus do universo. O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!

(O sacerdote, de braços abertos, diz:)
PR: Ó Pai, vós que sempre quisestes ficar muito perto de nós, vivendo conosco no Cristo, falando conosco por ele,
(Une as mãos e, estendendo-as sobre as oferendas, diz:)
PR: mandai o vosso Espírito Santo,
(une as mãos e traça o sinal da cruz, ao mesmo tempo sobre o pão e o cálice, dizendo:)
PR: a fim de que as nossas ofertas se mudem no Corpo ✠ e no Sangue de nosso Senhor Jesus Cristo.
(A assembleia aclama:)
T: Mandai vosso Espírito Santo!

(O relato da instituição da Eucaristia seja proferido de modo claro e audível como requer a sua natureza.)
PR: Na noite em que ia ser entregue, ceando com seus Apóstolos,
(toma o pão e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: Jesus tomou o pão em suas mãos,
(eleva os olhos)
PR: olhou para o céu e vos deu graças, partiu o pão e o entregou a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.
(Mostra ao povo a hóstia consagrada, coloca-a na patena e genuflete em adoração.)

(Então prossegue:)
PR: Do mesmo modo, no fim da Ceia,
(toma o cálice nas mãos e, mantendo-o um pouco elevado acima do altar, prossegue:)
PR: tomou o cálice em suas mãos, deu-vos graças novamente e o entregou a seus discípulos, dizendo:
(inclina-se levemente)
TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.
(Mostra o cálice ao povo, coloca-o sobre o corporal e genuflete em adoração.)

(Em seguida, diz:)
PR: Tudo isto é mistério da fé!
(A assembleia aclama:)
T: Toda vez que comemos deste Pão, toda vez que bebemos deste Vinho, recordamos a paixão de Jesus Cristo e ficamos esperando sua vinda.

(O sacerdote, de braços abertos, diz:)
PR: Recordando, ó Pai, neste momento, a paixão de Jesus, nosso Senhor, sua ressurreição e ascensão, nós queremos a vós oferecer este Pão que alimenta e que dá vida, este Vinho que nos salva e dá coragem.
(A assembleia aclama:)
T: Recebei, ó Senhor, a nossa oferta!

PR: E quando recebermos Pão e Vinho, o Corpo e Sangue dele oferecidos, o Espírito nos una num só corpo, para sermos um só povo em seu amor.
(A assembleia aclama:)
T: O Espírito nos una num só corpo!

PR: Protegei vossa Igreja que caminha nas estradas do mundo rumo ao céu, cada dia renovando a esperança de chegar junto a vós, na vossa paz.
(A assembleia aclama:)
T: Caminhamos na estrada de Jesus!

PR: Dai ao vosso servo, o Papa N., ser bem firme na fé, na caridade, e a N., que é Bispo desta Igreja, muita luz para guiar o vosso Povo.
(A assembleia aclama:)
T: Lembrai-vos, ó Pai, da vossa Igreja!

PR: Esperamos entrar na vida eterna com Maria, Mãe de Deus e da Igreja, os Apóstolos, e todos os que na vida souberam amar Cristo e seus irmãos.
(A assembleia aclama:)
T: Esperamos entrar na vida eterna!

PR: Abri as portas da misericórdia aos que chamastes para a outra vida; acolhei-os junto a vós, bem felizes, no reino que para todos preparastes.
(A assembleia aclama:)
T: A todos dai a luz que não se apaga!

(O sacerdote, de braços abertos, continua:)
PR: E a todos nós, aqui reunidos, que somos povo santo e pecador, dai-nos a graça de participar do vosso reino que também é nosso.
(Ergue a patena com a hóstia e o cálice, dizendo:)
PR: Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.
(A assembleia aclama:)
T: Amém.

(Segue-se o Rito da Comunhão.)`;

// ─────────────────────────────────────
//  DADOS — ORAÇÕES POR CATEGORIA
// ─────────────────────────────────────
const oracoesPorCategoria = {

  padroeiros: [
    { tipo: 'grupo', titulo: '✦ Padroeiros das Comunidades' },
    {
      titulo: "Oração ao Sagrado Coração de Jesus",
      sub: "Comunidade Sagrado Coração de Jesus",
      texto: `Ave, Coração admirável de Jesus, 
      nós te louvamos, te bendizemos, te glorificamos. 
      Nós te damos graças, te oferecemos o nosso coração 
      e o consagramos a ti
      Recebe-o e possui-o todo inteiro.
      Purifica-o, ilumina-o e santifica-o
      a fim de que nele vivas e reines para todo o sempre.
      Amém.`
    },
    {
      titulo: "Oração ao Coração de Jesus (Jesus, manso e humilde) – Pe. Júlio Chevalier",
      sub: "Comunidade Sagrado Coração de Jesus",
      texto: `Senhor Jesus, manso e humilde de Coração, derrama abundantemente sobre nós os dons do teu amor. Ilumina nossa inteligência para conhecer-te melhor e cada vez mais nos identificarmos contigo. Orienta a nossa vontade, dá-nos generosidade para caminhar sem resistência à ação do teu Espírito. 
Consagra-nos na verdade e no amor para que sejamos testemunhas de teu amor e te glorifiquemos sempre. Amém.`
    },
    {
      titulo: "Oração à Nossa Senhora do Sagrado Coração",
      sub: "Lembrai-vos, 2ª versão",
      texto: `Lembrai-Vos, ó Nossa Senhora do Sagrado Coração, que sois a Mãe de Jesus, a bendita entre todas as mulheres. Temos confiança em Vós porque estais unida a Cristo, vosso Filho e nosso Senhor. Sabemos de nossa fraqueza e de nossa miséria e por isso vimos implorar a vossa proteção. 
Ajudai-nos, ó Mãe querida. Dai-nos força e coragem. Conservai-nos na esperança, até o dia de nosso encontro definitivo com Deus, nosso Pai. Ó Mãe carinhosa, libertai-nos do egoísmo, alcançai para o mundo a paz e o amor. Concedei-nos em especial os favores que Vos suplicamos. Apresentai estes nossos pedidos e ações de graças ao vosso Filho e fazei, ó Maria, que venha a nós o seu Reino, Vós que sois a Senhora do Sagrado Coração. Amém.`
    },
    {
      titulo: "Oração à Natividade de Nossa Senhora",
      sub: "Comunidade Natividade de Maria",
      texto: `Ó Maria Santíssima, eleita e destinada ao eterno pelo Altíssimo para ser a Mãe do Filho de Deus, nós, vossos servos e filhos, nos alegramos pelo vosso feliz nascimento.
Assim como o vosso nascimento trouxe alegria ao mundo inteiro, porque de vós nasceu o Sol da Justiça, Cristo nosso Deus, fazei que o vosso nascimento espiritual em nossas almas traga a luz da graça e do divino amor.
Amém.`
    },
    {
      titulo: "Oração a Santa Rita de Cássia",
      sub: "Comunidade Santa Rita de Cássia",
      texto: `Ó poderosa e gloriosa Santa Rita, chamada Santa das causas impossíveis, advogada dos casos desesperados, auxiliadora da última hora, refúgio e abrigo na dor que arrasta para o abismo do pecado e do desespero, com toda a confiança em vosso poder junto ao Coração Eucarístico de Jesus, a vós recorro no caso difícil e imprevisto, que oprime dolorosamente o meu coração.
Alcançai-me a graça que desejo, pois sendo-me necessária, eu a quero. Apresentada por vós a minha oração, o meu pedido, por vós que sois tão amada por Deus, certamente será atendido.
Amém.`
    },
    {
      titulo: "Oração à Imaculada Conceição",
      sub: "Comunidade Imaculada Conceição",
      texto: `Ó Maria concebida sem pecado, rogai por nós que recorremos a vós.
Virgem Santíssima, que agradastes ao Senhor e fostes sua Mãe, imaculada no corpo e na alma, na fé e no amor, neste dia a vós me consagro. Em vossas mãos deposito minha vida, minha família e meu coração.
Fazei que, assim como vós preservastes vosso coração de toda a mancha, possamos também nós viver em pureza de coração e em constante amor a Deus.
Amém.`
    },
    {
      titulo: "Oração a Santa Edwiges",
      sub: "Comunidade Santa Edwiges",
      texto: `Ó Santa Edwiges, vós que na terra fostes o amparo dos pobres, a ajuda dos desvalidos e o socorro dos endividados, e no Céu agora desfrutais do eterno prêmio da caridade que em vida praticastes, suplicante vos peço que sejais a minha advogada, para que eu obtenha de Deus o auxílio de que urgentemente necessito: (fazer o pedido).
Alcançai-me também a suprema graça da salvação eterna.
Amém.`
    },
    {
      titulo: "Oração a Nossa Senhora do Carmo",
      sub: "Comunidade Nossa Senhora do Carmo",
      texto: `Senhora do Carmo, Rainha dos Anjos, canal das mais ternas mercês de Deus para com os homens. Refúgio e advogada dos pecadores, com confiança eu me prosto diante de vós, suplicando-vos que me obtenhais a graça que necessito (fazer o pedido).
Em reconhecimento, solenemente prometo recorrer a vós em todas as minhas dificuldades, sofrimentos e tentações, e farei tudo que estiver ao meu alcance a fim de induzir outros a amar-vos, a reverenciar-vos e a invocar-vos em todas as suas necessidades.
Amém.`
    },
    {
      titulo: "Oração ao Divino Espírito Santo",
      sub: "Comunidade Divino Espírito Santo",
      texto: `Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do Vosso amor. Enviai o Vosso Espírito e tudo será criado, e renovareis a face da terra.
Oremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo Senhor Nosso.
Amém.`
    }
  ],

  destaque: [
    {
      titulo: "Oração a São Miguel Arcanjo",
      sub: "Pequeno Exorcismo de Leão XIII",
      destaque: true,
      texto: `São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e aos outros espíritos malignos, que andam pelo mundo para perder as almas. Amém.`,
    },
    {
      titulo: "Consagração a São Miguel Arcanjo",
      sub: "Ato de Consagração Pessoal",
      destaque: true,
      texto: `Ó Príncipe nobilíssimo dos Anjos, valoroso guerreiro do Altíssimo, zeloso defensor da glória do Senhor, terror dos espíritos rebeldes, amor e delícia de todos os Anjos justos, meu diletíssimo Arcanjo São Miguel, desejando eu fazer parte do número dos vossos devotos e servos, a vós hoje me consagro, me dou e me ofereço e ponho-me a mim próprio, a minha família e tudo o que me pertence, debaixo da vossa poderosíssima proteção.

É pequena a oferta do meu serviço, sendo como sou um miserável pecador, mas vós engrandecereis o afeto do meu coração; recordai-vos que de hoje em diante estou debaixo do vosso patrocínio e vós deveis em toda a minha vida assistir-me e procurar-me o perdão dos meus muitos e graves pecados, a graça de amar a Deus de todo coração, ao meu querido Salvador Jesus Cristo e a minha Mãe Maria Santíssima, impetrai-me aqueles auxílios que me são necessários para obter a coroa da eterna glória.

Defendei-me dos inimigos da alma, especialmente na hora da morte. Vinde, ó príncipe gloriosíssimo, assistir-me na última luta e com a vossa arma poderosa lançai para longe, precipitando nos abismos do inferno, aquele anjo quebrador de promessas e soberbo que um dia prostrastes no combate no céu. São Miguel Arcanjo, defendei-nos no combate para que não pereçamos no supremo juízo. Amém.`,
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
    { tipo: 'grupo', titulo: '✦ Liturgia Eucarística — Principais' },
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
    {
      titulo: "Oração Eucarística V",
      sub: "Do Congresso de Manaus (Reconciliação e Unidade). Texto Completo.",
      isLongo: true,
      texto: textoOEV,
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
    { tipo: 'grupo', titulo: '✦ O Santo Rosário' },
    {
      titulo: "Como rezar o Terço do Rosário",
      sub: "Guia completo de orações e meditações",
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
6. Salve Rainha ao final`,
    },
    {
      titulo: "Mistérios Gozosos",
      sub: "Rezado às Segundas-feiras e Sábados",
      isLongo: true,
      texto: `Mistérios da Alegria

PRIMEIRO MISTÉRIO: A Anunciação do Arcanjo Gabriel à Virgem Maria.
"No sexto mês, o anjo Gabriel foi enviado por Deus a uma cidade da Galileia, chamada Nazaré, a uma virgem desposada com um homem que se chamava José... Maria disse então: 'Eis aqui a serva do Senhor; faça-se em mim segundo a tua palavra!'" (Lc 1, 26-27.38)
(Contemplamos a humildade de Maria ao aceitar a vontade de Deus.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

SEGUNDO MISTÉRIO: A Visitação de Maria a sua prima Santa Isabel.
"Naqueles dias, Maria se levantou e foi às pressas para as montanhas, a uma cidade de Judá. Entrou na casa de Zacarias e saudou Isabel... Isabel ficou cheia do Espírito Santo e exclamou em alta voz: 'Bendita és tu entre as mulheres e bendito é o fruto do teu ventre!'" (Lc 1, 39-42)
(Contemplamos a caridade de Maria que corre para servir quem precisa.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

TERCEIRO MISTÉRIO: O Nascimento de Jesus em Belém.
"Enquanto lá estavam, completaram-se os dias para o parto, e ela deu à luz o seu filho primogênito, envolveu-o em faixas e deitou-o numa manjedoura, porque não havia lugar para eles na hospedaria." (Lc 2, 6-7)
(Contemplamos o amor de Deus que se fez pobre por nós.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUARTO MISTÉRIO: A Apresentação do Menino Jesus no Templo.
"Concluídos os dias da sua purificação, segundo a Lei de Moisés, levaram-no a Jerusalém para o apresentar ao Senhor, conforme o que está escrito na lei do Senhor: Todo primogênito do sexo masculino será consagrado ao Senhor." (Lc 2, 22-23)
(Contemplamos a obediência à lei de Deus e a pureza de Maria.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUINTO MISTÉRIO: O Encontro do Menino Jesus no Templo entre os doutores.
"Sua mãe e seu pai iam todos os anos a Jerusalém para a festa da Páscoa... Três dias depois, o encontraram no Templo, sentado no meio dos doutores, ouvindo-os e interrogando-os. Todos os que o ouviam estavam maravilhados da sua inteligência e de suas respostas." (Lc 2, 41.46-47)
(Contemplamos a alegria de encontrar Jesus após buscá-Lo com perseverança.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.
`
    },
    {
      titulo: "Mistérios Luminosos",
      sub: "Rezado às Quintas-feiras",
      isLongo: true,
      texto: `Mistérios da Luz

PRIMEIRO MISTÉRIO: O Batismo de Jesus no rio Jordão.
"Logo que foi batizado, Jesus saiu da água. Eis que os céus se abriram e ele viu o Espírito de Deus descer como pomba e vir sobre ele. E do céu desceu uma voz: 'Este é o meu Filho amado, em quem me comprazo'." (Mt 3, 16-17)
(Contemplamos a descida do Espírito Santo e nosso próprio chamado à santidade.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

SEGUNDO MISTÉRIO: O primeiro milagre nas Bodas de Caná.
"Três dias depois, celebravam-se bodas em Caná da Galileia, e achava-se ali a mãe de Jesus. Faltando vinho, a mãe de Jesus lhe disse: 'Eles já não têm vinho'... Sua mãe disse aos serventes: 'Fazei tudo o que ele vos disser'." (Jo 2, 1.3.5)
(Contemplamos a intercessão poderosa de Maria junto a seu Filho.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

TERCEIRO MISTÉRIO: O Anúncio do Reino de Deus.
"Depois que João foi preso, Jesus foi para a Galileia, pregando o Evangelho de Deus e dizendo: 'O tempo já se completou e o Reino de Deus está próximo. Convertei-vos e crede no Evangelho'." (Mc 1, 14-15)
(Contemplamos a urgência da conversão e da busca pelo Reino.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUARTO MISTÉRIO: A Transfiguração de Jesus.
"Jesus tomou consigo Pedro, Tiago e João, seu irmão, e os levou a um alto monte, à parte. Ali foi transfigurado diante deles; o seu rosto resplandeceu como o sol, e as suas vestes tornaram-se brancas como a luz... Uma voz dizia da nuvem: 'Este é o meu Filho amado, no qual eu pus todo o meu agrado. Escutai-o!'" (Mt 17, 1-2.5)
(Contemplamos a glória divina de Jesus para fortalecer nossa fé nas provações.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUINTO MISTÉRIO: A Instituição da Eucaristia.
"Enquanto ceavam, Jesus tomou o pão, deu graças, partiu-o e deu-o aos seus discípulos, dizendo: 'Tomai, todos, e comei: isto é o meu corpo'. Em seguida, tomou o cálice, deu graças e entregou-lho, dizendo: 'Bebei dele todos, porque este é o meu sangue, o sangue da nova aliança, derramado por muitos para remissão dos pecados'." (Mt 26, 26-28)
(Contemplamos o amor de Jesus que se doa como alimento eterno.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.
`
    },
    {
      titulo: "Mistérios Dolorosos",
      sub: "Rezado às Terças e Sextas-feiras",
      isLongo: true,
      texto: `Mistérios da Dor

PRIMEIRO MISTÉRIO: A Agonia de Jesus no Horto das Oliveiras.
"Jesus saiu e, como de costume, foi para o monte das Oliveiras... Afastou-se deles a distância de um tiro de pedra, ajoelhou-se e começou a orar: 'Pai, se queres, afasta de mim este cálice; contudo, não se faça a minha vontade, mas a tua!'. Cheio de angústia, orava com mais instante fervor, e o seu suor tornou-se como gotas de sangue a cair na terra." (Lc 22, 39.41-42.44)
(Contemplamos a tristeza de Cristo e a aceitação do cálice da salvação.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

SEGUNDO MISTÉRIO: A Flagelação de Jesus.
"Então Pilatos mandou prender Jesus e o flagelar. Verdadeiramente ele tomou sobre si as nossas enfermidades, e as nossas dores levou sobre si... Ele foi ferido por causa das nossas transgressões, e moído por causa das nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas suas pisaduras fomos sarados." (Jo 19, 1; Is 53, 4-5)
(Contemplamos os sofrimentos físicos suportados por nossos pecados e a pureza de Jesus.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

TERCEIRO MISTÉRIO: A Coroação de espinhos.
"Os soldados do governador conduziram Jesus ao pretório e teceram uma coroa de espinhos, puseram-na sobre a sua cabeça, e na sua mão direita uma vara; e, ajoelhando-se diante dele, o escarneciam, dizendo: 'Salve, Rei dos judeus!'." (Mt 27, 27.29)
(Contemplamos as humilhações do nosso Rei, suportadas por amor.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUARTO MISTÉRIO: Jesus carrega a cruz para o Calvário.
"Enquanto o conduziam, agarraram um certo Simão, cireneu, que voltava do campo, e impuseram-lhe a cruz para que a levasse atrás de Jesus. Seguia-o uma grande multidão de povo e de mulheres, que batiam no peito e o lamentavam." (Lc 23, 26-27)
(Contemplamos a paciência de Jesus sob o peso da Cruz e pedimos força em nossas lutas.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUINTO MISTÉRIO: A Crucificação e Morte de Jesus.
"Quando chegaram ao lugar chamado Calvário, ali o crucificaram, bem como aos malfeitores, um à direita e outro à esquerda. Era quase à hora sexta e toda a terra ficou em trevas até a hora nona... Dando um grande grito, Jesus disse: 'Pai, em tuas mãos entrego o meu espírito'. Dizendo isso, expirou." (Lc 23, 33.44.46)
(Contemplamos o amor supremo de Jesus que entrega a vida pela nossa salvação.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.
`
    },
    {
      titulo: "Mistérios Gloriosos",
      sub: "Rezado às Quartas-feiras e Domingos",
      isLongo: true,
      texto: `Mistérios da Glória

PRIMEIRO MISTÉRIO: A Ressurreição de Jesus.
"No primeiro dia da semana, muito de manhã, foram elas ao sepulcro... Encontraram a pedra rolada da entrada do sepulcro. Entrando, não acharam o corpo do Senhor Jesus. Estavam perplexas, quando lhes apareceram dois homens em vestes resplandecentes que disseram: 'Por que buscais entre os mortos aquele que vive? Ele não está aqui, ressuscitou'." (Lc 24, 1-5)
(Contemplamos a vitória de Cristo sobre a morte e nossa esperança da vida eterna.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

SEGUNDO MISTÉRIO: A Ascensão de Jesus ao Céu.
"Dizendo isso, foi elevado à vista deles, e uma nuvem o ocultou aos seus olhos. Estando eles com os olhos fitos no céu, enquanto ele subia, eis que dois homens em vestes brancas se puseram ao lado deles e disseram: 'Homens da Galileia, por que ficais aí a olhar para o céu? Esse Jesus que vos foi arrebatado para o céu, virá da mesma forma que o vistes ir'." (At 1, 9-11)
(Contemplamos Jesus que volta ao Pai para nos preparar uma morada eterna.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

TERCEIRO MISTÉRIO: A descida do Espírito Santo.
"Chegando o dia de Pentecostes, estavam todos reunidos no mesmo lugar. De repente, veio do céu um ruído, como se soprasse um vento impetuoso... Apareceram-lhes então línguas como de fogo, que se repartiram e pousaram sobre cada um deles. Ficaram todos cheios do Espírito Santo." (At 2, 1-4)
(Contemplamos o dom do Espírito Santo para renovar a face da terra e inflamar nossos corações.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUARTO MISTÉRIO: A Assunção de Nossa Senhora ao Céu.
"Apareceu em seguida um grande sinal no céu: uma Mulher vestida de sol, a lua debaixo dos seus pés e na cabeça uma coroa de doze estrelas. Todas as gerações me chamarão bem-aventurada, porque o Todo-poderoso fez grandes coisas em meu favor. O seu nome é santo." (Ap 12, 1; Lc 1, 48-49)
(Contemplamos a glorificação do corpo e da alma da Virgem Maria, primícias da Igreja.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.

QUINTO MISTÉRIO: A Coroação de Nossa Senhora.
"A glória do Senhor amanheceu sobre ti. Por ti seremos salvos! Tu és a glória de Jerusalém, tu és a alegria de Israel, tu és a honra do nosso povo. O Senhor todo-poderoso te abençoou para sempre. E todo o povo respondeu: Amém!" (Cânticos e Jdt 15, 9-10)
(Contemplamos a glória final de Maria, Rainha do Céu e da Terra, nossa poderosa advogada.)
R. 1 Pai-Nosso, 10 Ave-Marias, Glória e Jaculatória.
`
    },
    { tipo: 'grupo', titulo: '✦ Outras Coroas e Devoções' },
    {
      titulo: "Terço de São Miguel Arcanjo",
      sub: "Poderosa proteção contra as forças do mal",
      isLongo: true,
      texto: `Início do Terço
V. Deus, vinde em nosso auxílio.
R. Senhor, socorrei-nos e salvai-nos.
Glória ao Pai...

PRIMEIRA SAUDAÇÃO (Aos Serafins)
Pela intercessão de São Miguel e do coro celeste dos Serafins, para que o Senhor nos torne dignos de sermos abrasados de uma perfeita caridade. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

SEGUNDA SAUDAÇÃO (Aos Querubins)
Pela intercessão de São Miguel e do coro celeste dos Querubins, para que o Senhor nos conceda a graça de fugirmos do pecado e procurarmos a perfeição cristã. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

TERCEIRA SAUDAÇÃO (Aos Tronos)
Pela intercessão de São Miguel e do coro celeste dos Tronos, para que Deus derrame em nossos corações o espírito de verdadeira e sincera humildade. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

QUARTA SAUDAÇÃO (Às Dominações)
Pela intercessão de São Miguel e do coro celeste das Dominações, para que o Senhor nos conceda a graça de dominar nossos sentidos e de nos corrigir das nossas más paixões. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

QUINTA SAUDAÇÃO (Às Potestades)
Pela intercessão de São Miguel e do coro celeste das Potestades, para que o Senhor se digne de proteger nossas almas contra as ciladas e as tentações do demônio. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

SEXTA SAUDAÇÃO (Às Virtudes)
Pela intercessão de São Miguel e do coro admirável das Virtudes, para que o Senhor não nos deixe cair em tentação, mas que nos livre de todo o mal. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

SÉTIMA SAUDAÇÃO (Aos Principados)
Pela intercessão de São Miguel e do coro celeste dos Principados, para que o Senhor encha nossas almas do espírito de uma verdadeira e sincera obediência. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

OITAVA SAUDAÇÃO (Aos Arcanjos)
Pela intercessão de São Miguel e do coro celeste dos Arcanjos, para que o Senhor nos conceda o dom da perseverança na fé e nas boas obras. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

NONA SAUDAÇÃO (Aos Anjos)
Pela intercessão de São Miguel e do coro celeste de todos os Anjos, para que sejamos guardados por eles nesta vida mortal e por eles conduzidos à glória eterna do Céu. Amém.
R. 1 Pai-Nosso e 3 Ave-Marias.

Saudações Finais
R. 1 Pai-Nosso em honra de São Miguel Arcanjo.
R. 1 Pai-Nosso em honra de São Gabriel.
R. 1 Pai-Nosso em honra de São Rafael.
R. 1 Pai-Nosso em honra ao nosso Anjo da Guarda.

Antífona Final
Gloriosíssimo São Miguel, chefe e príncipe dos exércitos celestes, fiel guardião das almas, vencedor dos espíritos rebeldes, amado da casa de Deus, nosso admirável guia depois de Cristo. Dignai-vos livrar-nos de todos os males e fazei-nos progredir a cada dia no serviço de nosso Deus.
V. Rogai por nós, ó bem-aventurado São Miguel, príncipe da Igreja de Jesus Cristo.
R. Para que sejamos dignos das suas promessas. Amém.`
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
};

// ─────────────────────────────────────
//  FUNÇÃO DE FORMATAÇÃO DE TEXTO
// ─────────────────────────────────────
const formatText = (text) => {
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={i} />;

    // Títulos de mistérios e saudações
    if (trimmed.includes('MISTÉRIO:') || trimmed.includes('SAUDAÇÃO') || trimmed === 'Início do Terço' || trimmed === 'Saudações Finais' || trimmed === 'Antífona Final') {
      return <strong key={i} className="block mt-10 mb-3 text-stone-800 uppercase tracking-widest text-[13px] md:text-sm border-b border-stone-200/60 pb-2">{trimmed}</strong>;
    }

    // Versículos bíblicos (começam e terminam com aspas, ou terminam com referência)
    if (trimmed.startsWith('"') && (trimmed.endsWith('"') || trimmed.match(/\)$/))) {
      return <span key={i} className="block font-serif text-stone-600 italic border-l-[3px] border-parish-gold pl-4 py-1 my-4 text-base md:text-lg bg-gradient-to-r from-parish-gold/5 to-transparent rounded-r-lg">{trimmed}</span>;
    }

    // Consecration words
    if (trimmed.startsWith('TOMAI,')) {
      return <span key={i} className="block font-serif font-bold text-lg md:text-xl mt-6 mb-8 text-parish-terracotta text-center italic">{trimmed}</span>;
    }

    // Mistério da fé
    if (trimmed.startsWith('Mistério da fé!')) {
      return <span key={i} className="block font-serif font-bold text-xl md:text-2xl mt-8 mb-6 text-center text-stone-800">{trimmed}</span>;
    }

    // PR: (Presidente/Padre)
    if (trimmed.startsWith('PR: ')) {
      return (
        <div key={i} className="flex gap-4 mb-4 mt-2">
          <div className="shrink-0 w-8 flex justify-center mt-1">
            <span className="text-[10px] font-bold text-stone-400 border border-stone-200 bg-stone-100 rounded px-1.5 py-0.5">PR</span>
          </div>
          <span className="block text-stone-700 leading-relaxed text-justify">{trimmed.replace('PR: ', '')}</span>
        </div>
      );
    }

    // T: (Todos/Assembleia)
    if (trimmed.startsWith('T: ')) {
      return (
        <div key={i} className="flex gap-4 my-6 bg-parish-gold/10 p-4 md:p-5 rounded-2xl border border-parish-gold/20">
          <div className="shrink-0 w-8 flex justify-center mt-0.5">
            <span className="text-[10px] font-bold text-parish-terracotta border border-parish-terracotta/30 bg-white rounded px-1.5 py-0.5">T</span>
          </div>
          <span className="block font-bold text-stone-800 text-lg leading-relaxed">{trimmed.replace('T: ', '')}</span>
        </div>
      );
    }

    // V. (Versículo)
    if (trimmed.startsWith('V. ')) {
      return (
        <div key={i} className="flex gap-4 mb-2 mt-4">
          <div className="shrink-0 w-8 flex justify-center mt-1">
            <span className="text-[10px] font-bold text-stone-400 border border-stone-200 bg-stone-100 rounded px-1.5 py-0.5">V</span>
          </div>
          <span className="block text-stone-600 leading-relaxed">{trimmed.replace('V. ', '')}</span>
        </div>
      );
    }

    // R. (Resposta)
    if (trimmed.startsWith('R. ')) {
      return (
        <div key={i} className="flex gap-4 mb-4">
          <div className="shrink-0 w-8 flex justify-center mt-1">
            <span className="text-[10px] font-bold text-parish-terracotta border border-parish-terracotta/30 bg-white rounded px-1.5 py-0.5">R</span>
          </div>
          <span className="block font-bold text-stone-800 leading-relaxed">{trimmed.replace('R. ', '')}</span>
        </div>
      );
    }

    // Textos informativos entre parênteses
    if (trimmed.match(/^\(.*\)$/)) {
      return <span key={i} className="block italic text-stone-500 mt-6 mb-4 text-sm text-center">{trimmed}</span>;
    }

    // Texto normal
    return <span key={i} className="block mb-4 text-stone-700 leading-relaxed text-justify">{trimmed}</span>;
  });
};

// ─────────────────────────────────────
//  MODAL DE LEITURA FOCADA (A TELA CHEIA)
// ─────────────────────────────────────
const ReadingModal = ({ item, catInfo, onClose }) => {
  if (!item) return null;

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
            <div className="font-serif text-base md:text-lg">
              {formatText(item.texto)}
            </div>
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
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200/60 sticky top-[64px] md:top-[70px] z-30 shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all">
        <div className="max-w-5xl mx-auto px-2 md:px-4">
          <div className="flex justify-start md:justify-center gap-2 overflow-x-auto py-3 px-2 md:px-0 scrollbar-hide scroll-smooth">
            {categorias.map(cat => {
              const CatIcon = cat.icon;
              const isActive = categoriaAtiva === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoria(cat.id)}
                  className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all shrink-0
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
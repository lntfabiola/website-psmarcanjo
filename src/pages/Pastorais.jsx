import React, { useState } from 'react';
import { 
  Users, Music, BookOpen, Heart, HandHeart, 
  Baby, Shield, Cross, X, Megaphone, 
  CalendarClock, ChevronRight, Mic2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pastorais = () => {
  const [selectedPastoral, setSelectedPastoral] = useState(null);

  // --- DADOS ---
  const comissoes = [
    {
      id: "anuncio",
      titulo: "Comissão do Anúncio",
      missao: "Evangelizar, promover a missionariedade, formar e anunciar o Evangelho.",
      cor: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      items: [
        { 
          nome: "Pastoral Familiar", 
          icon: <Users />, 
          desc: "Segundo o Diretório da Pastoral Familiar (n. 461), essa pastoral deve “promover, fortalecer e evangelizar a família, oferecendo formação para seus agentes, preparando noivos para os sacramentos e acompanhando, acolhendo e cuidando das famílias, segundo a Evangelho de Jesus Cristo e os ensinamentos da Igreja.\"",
          reunioes: "Encontros mensais, geralmente às 2ª sextas-feiras do mês (confirmar agenda na secretaria paroquial), no salão da Igreja Matriz São Miguel Arcanjo.\nAlém dos encontros, fazemos as visitas missionárias às famílias, geralmente no último sábado do mês (confirmar agenda na secretaria paroquial).",
          participar: "Reuniões abertas para todas as famílias. Maiores informações na secretaria paroquial ou com os agentes da Pastoral Familiar."
        },
        { 
          nome: "Pastoral da Juventude", 
          icon: <Users />, 
          desc: "A Pastoral da Juventude tem a missão de evangelizar os jovens a partir de sua própria realidade, sendo o \"jovem evangelizando o jovem\". Busca proporcionar um encontro pessoal com Jesus Cristo, despertando-os para o engajamento na comunidade e na sociedade à luz do Evangelho.",
          reunioes: "Encontros com momentos de espiritualidade, formação e convivência (consulte a secretaria para dias e horários).",
          participar: "Jovens a partir do Crisma. Venha participar do nosso grupo!"
        },
        { 
          nome: "Catequese (IVC)", 
          icon: <BookOpen />, 
          desc: "É a responsável pelos processos de iniciação à vida cristã nas suas diversas fases da vida humana, introduzindo os fiéis no Mistério de Cristo. Sua missão é conduzir e acompanhar os passos dos fiéis que iniciam/retomam sua caminhada na Igreja, levando-os a se tornarem discípulos missionários de Jesus Cristo e participantes ativos na vida comunitária.\n\nSendo responsável pela iniciação cristã em todas as fases da vida, a IVC tem a missão de anunciar o Evangelho, acompanhar e formar discípulos missionários na preparação de pais e padrinhos, crianças, jovens e adultos.",
          reunioes: <>Maiores informações na secretaria paroquial ou <Link to="/sacramentos" className="text-parish-gold hover:underline">clicando aqui</Link>.</>,
          participar: "Todos são bem-vindos! Fale com o coordenador."
        },
        { 
          nome: "Pascom", 
          full: "Pastoral da Comunicação",
          icon: <Megaphone />, 
          desc: "A Pascom atua como eixo transversal da evangelização. Sua missão é anunciar o Evangelho através dos meios de comunicação, integrando as diversas pastorais e dando visibilidade à ação evangelizadora da paróquia, seja através das redes sociais, murais ou transmissões sagradas.",
          reunioes: "Encontros de planejamento e cobertura dos eventos paroquiais.",
          participar: "Se você tem habilidades com fotografia, redes sociais, redação ou design, junte-se a nós!"
        },
        { 
          nome: "Pastoral do Dízimo", 
          icon: <HandHeart />, 
          desc: "Tem como finalidade conscientizar os fiéis sobre a dimensão bíblica, teológica e espiritual do dízimo. Mais do que uma arrecadação, é a pastoral responsável por promover a partilha, garantindo a sustentabilidade da ação evangelizadora, das necessidades do culto divino e da caridade.",
          reunioes: "Plantão do Dízimo durante as missas de final de semana.",
          participar: "Procure a equipe do Dízimo nos finais de semana ou diretamente na secretaria."
        },
        { 
          nome: "ECC", 
          full: "Encontro de Casais com Cristo", 
          icon: <Heart />, 
          desc: "“É um serviço da Igreja para a evangelizar a famílias (...) e para despertar os casais paras as pastorais paroquiais” (Documento Nacional, p. 15). Promove encontros para os casais, com o objetivo de fortalecer os laços matrimoniais, a vivência do amor cristão na família e a convivência comunitária.",
          reunioes: "Realiza encontros para casais anualmente, além de criar pequenos grupos (círculos) para a oração comum e a convivência fraterna.",
          participar: "Maiores informações na secretaria paroquial ou com os agentes da Pastoral Familiar."
        },
        { 
          nome: "Rebento de Davi", 
          icon: <Music />, 
          desc: "Movimento de espiritualidade que busca a renovação da fé através da efusão do Espírito Santo. Os encontros são marcados por profundo louvor, adoração, estudo da Palavra e fraternidade, despertando os fiéis para um relacionamento mais íntimo com Deus.",
          reunioes: "Grupo de Oração e Louvor no salão paroquial.",
          participar: "Todos são bem-vindos para louvar ao Senhor."
        }
      ]
    },
    {
      id: "santificacao",
      titulo: "Comissão da Santificação",
      missao: "Promover a vida litúrgica, a espiritualidade e a santificação do povo.",
      cor: "bg-orange-50 border-orange-200",
      iconColor: "text-parish-terracotta",
      items: [
        { 
          nome: "Liturgia Paroquial", 
          icon: <BookOpen />, 
          desc: "A Pastoral Litúrgica é o coração das celebrações da paróquia. Como ensina o Concílio Vaticano II, a liturgia é \"a fonte e o ápice de toda a vida cristã\". Esta pastoral organiza, prepara e zela pelas santas missas, garantindo que o mistério pascal de Cristo seja celebrado com dignidade, beleza e participação ativa dos fiéis.",
          reunioes: "Reuniões de preparação litúrgica.",
          participar: "Aberto a leitores, comentaristas e interessados na liturgia sagrada."
        },
        { 
          nome: "Cantores Litúrgicos", 
          icon: <Mic2 />, 
          desc: "Ministério de música focado na animação litúrgica. Tem a missão de elevar as almas a Deus através do canto sagrado, ajudando a assembleia a rezar e participar ativamente das celebrações litúrgicas, respeitando sempre a dignidade e o tempo litúrgico.",
          reunioes: "Ensaios com as equipes de música.",
          participar: "Instrumentistas e cantores dispostos a servir na liturgia através da arte."
        },
        { 
          nome: "MECEs", 
          full: "Ministros da Eucaristia", 
          icon: <Cross />, 
          desc: "Os Ministros Extraordinários da Sagrada Comunhão (MESC) exercem um serviço valioso à Igreja. Eles auxiliam os sacerdotes na distribuição da Eucaristia durante as missas e, sobretudo, levam o Corpo de Cristo aos enfermos e idosos que não podem se deslocar até a Igreja.",
          reunioes: "Encontros mensais de espiritualidade, escala e formação.",
          participar: "Exige indicação prévia, formação específica na Diocese e mandato conferido pelo Bispo/Pároco."
        },
        { 
          nome: "Pastoral da Saúde", 
          icon: <HandHeart />, 
          desc: "É a presença caritativa e confortadora da Igreja junto aos enfermos e seus familiares. Através de visitas regulares aos hospitais e residências, os agentes levam uma palavra de esperança, a presença de Cristo e o conforto da oração aos que sofrem e necessitam de lenitivo espiritual.",
          reunioes: "Visitas periódicas agendadas e reuniões de partilha.",
          participar: "Todos com vocação para a escuta, a compaixão e o zelo com os enfermos."
        },
        { 
          nome: "Pastoral do Batismo", 
          icon: <Baby />, 
          desc: "Tem a missão de acolher os pais e padrinhos que pedem o Sacramento do Batismo para as crianças. Prepara-os através de encontros de formação, ajudando-os a compreender a grandeza da filiação divina e o compromisso de educar na fé cristã católica.",
          reunioes: "Encontros formativos periódicos de preparação para o Batismo.",
          participar: "Consagrados e famílias maduras na fé podem atuar como formadores."
        },
        { 
          nome: "Apostolado da Oração", 
          icon: <Heart />, 
          desc: "É uma rede mundial de oração do Papa. Os membros do Apostolado dedicam-se ao amor e à reparação ao Sagrado Coração de Jesus, oferecendo diariamente suas orações, obras e sofrimentos pela salvação das almas e pelas intenções da Santa Igreja.",
          reunioes: "Missa da Primeira Sexta-feira do mês (dedicada ao Sagrado Coração) e encontros do grupo.",
          participar: "Basta ter amor ao Coração de Jesus. Procure a zeladora do grupo para receber a fita."
        },
        { 
          nome: "Servidores do Altar", 
          full: "Coroinhas e Acólitos", 
          icon: <Shield />, 
          desc: "Auxiliam diretamente o sacerdote no serviço do Altar durante as ações litúrgicas. É uma bela vocação de amor à Eucaristia, respeito ao rito sagrado e zelo pelas coisas de Deus, promovendo frequentemente o despertar vocacional.",
          reunioes: "Ensaios litúrgicos e formação contínua.",
          participar: "Crianças e jovens após a Primeira Eucaristia. Fale com a coordenação na sacristia."
        },
        { 
          nome: "RCC / Grupo de Oração", 
          icon: <FlameIcon />, 
          desc: "A Renovação Carismática Católica promove uma cultura de Pentecostes, conduzindo as pessoas à experiência do Batismo no Espírito Santo. Através dos Grupos de Oração, vivencia-se a oração de louvor, a escuta da Palavra e o exercício dos carismas para edificação da Igreja.",
          reunioes: "Grupo de Oração semanal aberto à comunidade.",
          participar: "Os encontros são abertos. Venha viver um Pentecostes contínuo!"
        },
        { 
          nome: "Grupos de Terços", 
          icon: <Cross />, 
          desc: "A devoção mariana espalhada pelos lares da paróquia. Reúnem-se nas casas das famílias ou nas capelas para rezar o Santo Rosário, meditando os mistérios da vida de Jesus pelas mãos de Maria, promovendo a comunhão fraterna e a igreja doméstica.",
          reunioes: "Encontros nas casas das famílias, geralmente de forma itinerante.",
          participar: "Todos são convidados a participar e a abrir as portas de suas casas para Nossa Senhora."
        },
        { 
          nome: "Terço dos Homens", 
          icon: <Users />, 
          desc: "Movimento que resgata e fortalece a presença masculina no seio da Igreja através da piedade mariana. É um momento forte de oração onde pais de família, jovens e avós se ajoelham juntos para rezar, intercedendo pelas famílias, pela paz e pelas necessidades do mundo.",
          reunioes: "Encontros semanais na Matriz (verifique o dia na secretaria).",
          participar: "Aberto a todos os homens, jovens e senhores da comunidade."
        }
      ]
    },
    {
      id: "testemunho",
      titulo: "Comissão do Testemunho",
      missao: "Promover a justiça social e a caridade à luz do Evangelho.",
      cor: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      items: [
        { 
          nome: "Pastoral Social", 
          icon: <HandHeart />, 
          desc: "É o rosto caritativo da Igreja, atuando na promoção humana e na defesa da vida. À luz da Doutrina Social da Igreja e do Evangelho (\"Tive fome e me destes de comer\"), esta pastoral arrecada, organiza e distribui cestas básicas e assistência às famílias em situação de vulnerabilidade social na comunidade.",
          reunioes: "Arrecadação permanente, organização de doações e entrega das cestas.",
          participar: "Toda doação de alimentos, recursos e também o trabalho voluntário na triagem são muito bem-vindos."
        },
        { 
          nome: "Psicologia", 
          full: "Atendimentos Psicológicos", 
          icon: <Users />, 
          desc: "Oferece plantão e acolhimento psicológico solidário para membros da comunidade que necessitam de escuta ativa e suporte emocional profissional, compreendendo que a Igreja atua como um \"hospital de campanha\", aliando o cuidado com a mente ao conforto espiritual.",
          reunioes: "Atendimentos individuais mediante agendamento e disponibilidade dos profissionais.",
          participar: "Psicólogos voluntários são necessários; os fiéis necessitados devem procurar orientações na secretaria paroquial."
        },
        { 
          nome: "Grupo de Ginástica", 
          icon: <Users />, 
          desc: "Projeto comunitário de testemunho fraterno que visa a saúde preventiva e o bem-estar físico e mental, com especial atenção à terceira idade. É também um importante espaço de socialização, alegria e fortalecimento de laços de amizade e comunhão dentro da paróquia.",
          reunioes: "Aulas no salão paroquial.",
          participar: "Inscreva-se na secretaria. Recomenda-se acompanhamento de saúde."
        },
        { 
          nome: "Pastoral da Sobriedade", 
          icon: <Shield />, 
          desc: "Ação concreta da Igreja frente ao flagelo da dependência química. É uma pastoral de prevenção e recuperação que atua nos pilares da oração, orientação e partilha, ajudando dependentes e co-dependentes (familiares) a trilharem juntos o caminho da libertação e da sobriedade.",
          reunioes: "Grupos de mútua ajuda (consulte a secretaria para horários).",
          participar: "Reuniões baseadas em absoluto sigilo, amor e acolhimento. Venha sem medo."
        }
      ]
    }
  ];

  return (
    // AJUSTE RESPONSIVO: pt-24 (mobile) vs pt-32 (pc) | pb-32 (mobile pra barra não tapar) vs pb-28
    <div className="min-h-screen bg-[#f4f1ea] pt-24 md:pt-32 pb-32 md:pb-28 px-4 relative overflow-hidden">
      
      {/* Decoração */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/60 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-parish-terracotta font-bold tracking-[0.2em] text-xs uppercase block mb-2">Serviço e Doação</span>
          <h1 className="text-3xl md:text-6xl font-serif font-bold text-parish-dark">
            Pastorais e Movimentos
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Conheça como nossa paróquia se organiza para evangelizar, santificar e servir.
          </p>
        </div>

        {/* --- LISTA DE COMISSÕES --- */}
        <div className="space-y-12 md:space-y-16">
          {comissoes.map((comissao) => (
            <div key={comissao.id}>
              
              {/* Header da Seção (Responsivo: Flex Col no Mobile) */}
              <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-6 border-b border-gray-200/50 pb-4 text-center md:text-left">
                 <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-parish-brown">
                        {comissao.titulo}
                    </h2>
                 </div>
                 <p className="text-gray-500 text-xs md:text-sm italic max-w-xl md:text-right hidden md:block">
                    "{comissao.missao}"
                 </p>
              </div>

              {/* Grid Responsivo (1 col mobile -> 2 sm -> 3 lg) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                 {comissao.items.map((item, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setSelectedPastoral({...item, comissao: comissao.titulo})}
                        className={`bg-white p-5 rounded-xl md:rounded-2xl border hover:border-parish-gold/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center gap-4 ${comissao.cor.replace('bg-', 'hover:bg-')}`}
                    >
                        <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white transition-colors shrink-0 ${comissao.iconColor}`}>
                            {React.cloneElement(item.icon, { size: 24 })}
                        </div>
                        <div className="flex-1 min-w-0"> {/* min-w-0 evita que texto estoure */}
                            <h3 className="font-serif font-bold text-parish-dark text-base md:text-lg leading-tight mb-0.5 truncate">
                                {item.nome}
                            </h3>
                            {item.full && <p className="text-[10px] text-gray-400 font-bold uppercase truncate">{item.full}</p>}
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-parish-gold transition-colors shrink-0"/>
                    </div>
                 ))}
              </div>

            </div>
          ))}
        </div>

        {/* --- BANNER CPC --- */}
        <div className="mt-16 md:mt-24 bg-parish-dark text-white rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">Conselhos Pastorais (CPCs)</h3>
                    <p className="text-white/60 text-sm md:text-base max-w-lg">
                        Cada comunidade possui seu conselho. Conheça as capelas e seus padroeiros.
                    </p>
                </div>
                <Link to="/comunidades" className="w-full md:w-auto">
                    <button className="w-full md:w-auto bg-parish-gold text-parish-dark px-6 py-3 rounded-full font-bold hover:bg-white transition-colors shadow-lg text-sm md:text-base">
                        Ver Nossas Comunidades
                    </button>
                </Link>
            </div>
            {/* Decoração */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        </div>

      </div>

      {/* --- MODAL RESPONSIVO --- */}
      {selectedPastoral && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-4">
            
            {/* Fundo Escuro (Click fecha) */}
            <div className="absolute inset-0 bg-parish-dark/90 backdrop-blur-sm" onClick={() => setSelectedPastoral(null)}></div>
            
            {/* Caixa do Modal */}
            {/* Mobile: Sobe de baixo (bottom-sheet style). Desktop: Centralizado */}
            <div className="relative bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl shadow-2xl p-6 md:p-8 animate-slideUp md:animate-scaleIn max-h-[85vh] overflow-y-auto">
                
                {/* Barrinha de "arrastar" visual no mobile */}
                <div className="md:hidden w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>

                <button 
                    onClick={() => setSelectedPastoral(null)}
                    className="hidden md:block absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                >
                    <X size={24}/>
                </button>

                <span className="text-[10px] font-bold uppercase tracking-widest text-parish-terracotta bg-parish-terracotta/10 px-3 py-1 rounded-full mb-4 inline-block">
                    {selectedPastoral.comissao}
                </span>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-parish-dark mb-2 leading-tight">
                    {selectedPastoral.full || selectedPastoral.nome}
                </h2>
                
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                    {selectedPastoral.desc}
                </p>

                {/* Infos Adicionais */}
                <div className="space-y-4 border-t border-gray-100 pt-6">
                    <div className="flex items-start gap-3">
                        <CalendarClock className="text-parish-gold shrink-0 mt-0.5" size={20}/>
                        <div>
                            <p className="text-xs font-bold uppercase text-gray-400">Reuniões</p>
                            <p className="text-sm font-medium text-gray-700 whitespace-pre-wrap">{selectedPastoral.reunioes || "Consulte a agenda paroquial."}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Users className="text-parish-gold shrink-0 mt-0.5" size={20}/>
                        <div>
                            <p className="text-xs font-bold uppercase text-gray-400">Como participar?</p>
                            <p className="text-sm font-medium text-gray-700 whitespace-pre-wrap">{selectedPastoral.participar || "Todos são bem-vindos! Fale com o coordenador."}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 flex flex-col md:flex-row gap-3">
                    <button 
                        onClick={() => setSelectedPastoral(null)}
                        className="md:hidden w-full bg-gray-100 text-gray-500 py-3 rounded-xl font-bold text-sm"
                    >
                        Fechar
                    </button>
                    <Link to="/contato" className="flex-1 bg-parish-dark text-white text-center py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors">
                        Fale Conosco
                    </Link>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

const FlameIcon = ({className, size}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size||24} height={size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3a9 9 0 0 0 .9 6.5"/></svg>
);

export default Pastorais;
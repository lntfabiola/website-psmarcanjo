import React, { useState } from 'react';
import { 
  Droplets, Heart, Users, Flame, BookOpen, AlertCircle, 
  X, CheckCircle, FileText, HelpCircle, Info, Calendar 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sacramentos = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('significado');

  const sacramentos = [
    {
      id: "batismo",
      title: "Batismo",
      icon: <Droplets size={40} />,
      color: "bg-blue-100 text-blue-700",
      shortDesc: "Informações sobre curso preparatório, documentos e datas de batizado.",
      conteudo: {
        significado: {
          texto: "O Santo Batismo é o fundamento de toda a vida cristã. Pelo Batismo somos libertados do pecado e regenerados como filhos de Deus, tornando-nos membros de Cristo e da Igreja.",
          biblia: '"Ide, pois, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo." (Mt 28:19)',
          efeitos: ["Remissão do Pecado Original", "Filho de Deus", "Membro da Igreja"]
        },
        requisitos: {
          // BASEADO NA IMAGEM 1
          documentos: [
            "Certidão de Nascimento da criança (Original e Cópia).",
            "Comprovante de endereço.",
            "Documentos pessoais (RG/CPF) de pais e padrinhos.",
            "Certidão de Casamento Religioso dos padrinhos (caso sejam casados).",
            "Certidão de Batismo dos padrinhos (devem ser católicos).",
            "Taxa de contribuição: R$ 160,00 (ref. 2025)."
          ],
          regrasPadrinhos: [
            "Idade superior a 16 anos.",
            "Devem ser Católicos Apostólicos Romanos.",
            "Solteiros: não podem morar junto (união estável).",
            "Casados: obrigatório ser casado na Igreja Católica (Religioso).",
            "Pode ser apenas 1 padrinho ou 1 madrinha."
          ],
          processo: [
            "1. Inscrição na Secretaria (vagas limitadas).",
            "2. Encontro Preparatório: 1º Domingo do mês (15h às 16h30) na Matriz.",
            "3. Dia do Batizado: Aos 3º Domingos do mês (9h) na Com. Sagrado Coração de Jesus.",
            "Obs: Crianças na preparação devem ficar com acompanhante fora do salão."
          ]
        },
        faq: [
          { p: "Criança acima de 7 anos?", r: "Necessita participar da Catequese/Iniciação à Vida Cristã." },
          { p: "Pais não casados na igreja?", r: "Os pais não precisam ser casados na igreja, mas os padrinhos precisam estar em situação regular (ou solteiros castos ou casados no religioso)." }
        ]
      }
    },
    {
      id: "matrimonio",
      title: "Matrimônio",
      icon: <Heart size={40} />,
      color: "bg-pink-100 text-pink-600",
      shortDesc: "Documentação necessária, prazos (mínimo 3 meses) e processo de habilitação matrimonial.",
      conteudo: {
        significado: {
          texto: "A aliança matrimonial, pela qual o homem e a mulher constituem entre si uma comunhão da vida toda, ordenada ao bem dos cônjuges e à prole.",
          biblia: '"O que Deus uniu, o homem não separe." (Mc 10:9)',
          efeitos: ["Unidade", "Indissolubilidade", "Graça de estado"]
        },
        requisitos: {
          // BASEADO NA IMAGEM 2
          documentos: [
            "Certidão de Batismo (Batistério) RECENTE e ORIGINAL (Validade de 6 meses) - Solicitar onde foi batizado.",
            "Cópia do agendamento do cartório ou Certidão de Casamento Civil.",
            "Xerox RG/CPF dos noivos e comprovante de residência.",
            "Xerox RG/CPF e comprovante de residência de 2 testemunhas.",
            "Certificado do Curso de Noivos.",
            "Se viúvo: certidão de óbito do cônjuge anterior."
          ],
          regrasPadrinhos: [
            "2 testemunhas para assinar o processo na igreja.",
            "Padrinhos de altar são definidos posteriormente com o cerimonial."
          ],
          processo: [
            "1. Comparecer à secretaria no MÍNIMO 3 meses antes da data.",
            "2. Entregar toda a documentação solicitada.",
            "3. Pagamento da contribuição referente ao Matrimônio.",
            "4. Agendamento da Entrevista com o Padre (após entrega dos docs)."
          ]
        },
        faq: [
          { p: "Já sou casado no civil?", r: "Trazer a certidão de casamento civil para anexar ao processo." },
          { p: "Divorciados podem casar?", r: "Se já foi casado na Igreja Católica, não (salvo nulidade). Se foi apenas no civil, trazer averbação do divórcio." }
        ]
      }
    },
    {
      id: "eucaristia",
      title: "1ª Eucaristia",
      icon: <BookOpen size={40} />,
      color: "bg-parish-light text-parish-brown",
      shortDesc: "Recebimento do Corpo e Sangue de Cristo. Requer preparação através da catequese.",
      conteudo: {
        significado: {
          texto: "A Sagrada Eucaristia completa a iniciação cristã. Participamos do próprio sacrifício do Senhor, fonte e ápice de toda a vida cristã.",
          biblia: '"Eu sou o pão vivo que desceu do céu." (Jo 6:51)',
          efeitos: ["União com Cristo", "Separação do pecado", "Vida da graça"]
        },
        requisitos: {
          documentos: ["Lembrança do Batismo", "RG da Criança", "Inscrição na Catequese"],
          regrasPadrinhos: ["Não há padrinhos, apenas acompanhamento dos pais."],
          processo: ["Catequese Infantil", "Duração média de 2 anos", "Inscrições geralmente em Fevereiro"]
        },
        faq: [
          { p: "Qual idade mínima?", r: "Geralmente a partir dos 8/9 anos (alfabetizado)." }
        ]
      }
    },
    {
      id: "crisma",
      title: "Crisma",
      icon: <Flame size={40} />,
      color: "bg-red-100 text-parish-terracotta",
      shortDesc: "Confirmação da graça batismal e o selo do Espírito Santo.",
      conteudo: {
        significado: {
          texto: "O sacramento da Confirmação enriquece os batizados com a força do Espírito Santo para serem verdadeiras testemunhas de Cristo.",
          biblia: '"Recebei o Espírito Santo." (Jo 20:22)',
          efeitos: ["Dons do Espírito", "Caráter indelével", "Maturidade cristã"]
        },
        requisitos: {
          documentos: ["Batistério", "Comp. Eucaristia", "RG Crismando/Padrinho"],
          regrasPadrinhos: ["Católico, crismado e de vida idônea."],
          processo: ["Preparação de 1 ano", "75% frequência", "Retiro espiritual"]
        },
        faq: [
          { p: "Se eu faltar?", r: "Reprovação por falta existe na catequese." }
        ]
      }
    },
    {
        id: "confissao",
        title: "Confissão",
        icon: <Users size={40} />,
        color: "bg-purple-100 text-purple-600",
        shortDesc: "Perdão dos pecados e reconciliação.",
        conteudo: {
          significado: {
            texto: "Obtemos da misericórdia de Deus o perdão da ofensa a Ele feita e nos reconciliamos com a Igreja.",
            biblia: '"A quem perdoardes, lhes serão perdoados." (Jo 20:23)',
            efeitos: ["Paz de consciência", "Restituição da graça"]
          },
          requisitos: {
            documentos: ["Apenas exame de consciência."],
            regrasPadrinhos: ["Não se aplica."],
            processo: ["Atendimento: Quarta (17h-19h) e Sábado (9h-12h).", "Ordem de chegada na Matriz."]
          },
          faq: [
            { p: "Padre conta?", r: "Sigilo absoluto sob pena de excomunhão." }
          ]
        }
      },
      {
        id: "uncao",
        title: "Unção",
        icon: <AlertCircle size={40} />,
        color: "bg-green-100 text-green-600",
        shortDesc: "Conforto na doença e velhice.",
        conteudo: {
            significado: {
                texto: "Entrega os doentes ao Senhor sofredor e glorificado, para que os alivie e salve.",
                biblia: '"Alguém doente? Chame os presbíteros." (Tg 5:14)',
                efeitos: ["União à Paixão", "Perdão dos pecados", "Conforto"]
              },
            requisitos: {
              documentos: ["Nenhum."],
              regrasPadrinhos: ["Nenhum."],
              processo: ["Ligar na secretaria com urgência."]
            },
            faq: [
              { p: "Só pra morrer?", r: "Não, para qualquer doença grave ou idosos." }
            ]
        }
      }
  ];

  // COMPONENTE INTERNO DO MODAL
  const ModalContent = ({ sacramento }) => {
    return (
        <div className="flex flex-col h-full bg-white">
            {/* Navegação de Abas */}
            <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10 overflow-x-auto">
                {['significado', 'requisitos', 'faq'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)} 
                        className={`flex-1 min-w-max md:flex-1 py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap
                        ${activeTab === tab ? 'text-parish-terracotta border-b-4 border-parish-terracotta bg-red-50/50' : 'text-gray-400 hover:bg-gray-50'}`}
                    >
                        {tab === 'faq' ? 'Dúvidas' : (tab === 'significado' ? 'O que é' : 'Regras')}
                    </button>
                ))}
            </div>

            {/* Conteúdo com Scroll */}
            <div className="flex-1 overflow-y-auto p-5 pb-16 md:p-8 md:pb-8 space-y-6">
                
                {activeTab === 'significado' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-parish-light/30 p-5 rounded-xl border-l-4 border-parish-gold">
                            <h3 className="font-serif font-bold text-parish-brown text-lg mb-2">Definição</h3>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify">
                                {sacramento.conteudo.significado.texto}
                            </p>
                        </div>
                        <div>
                             <h4 className="flex items-center gap-2 font-bold text-parish-dark text-xs uppercase mb-2">
                                <Info size={16}/> Na Bíblia
                             </h4>
                             <p className="italic text-gray-500 bg-gray-50 p-4 rounded-lg text-sm border border-gray-100">
                                {sacramento.conteudo.significado.biblia}
                             </p>
                        </div>
                        <div>
                             <h4 className="font-bold text-parish-dark text-xs uppercase mb-3">Efeitos Espirituais</h4>
                             <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                 {sacramento.conteudo.significado.efeitos.map((ef, i) => (
                                     <li key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded border border-gray-100 shadow-sm">
                                         <CheckCircle size={14} className="text-green-500"/> {ef}
                                     </li>
                                 ))}
                             </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'requisitos' && (
                    <div className="space-y-6 animate-fadeIn">
                        
                        <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-start gap-3">
                            <AlertCircle className="text-parish-terracotta shrink-0 mt-0.5" size={20}/>
                            <div>
                                <h4 className="text-parish-terracotta font-bold text-sm uppercase mb-1">Atenção</h4>
                                <p className="text-xs text-gray-600">
                                    Todos os documentos devem ser originais ou cópias autênticas. Prazos devem ser respeitados.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-parish-dark text-sm uppercase mb-3 border-b border-gray-100 pb-2">
                                <FileText size={18} className="text-parish-terracotta"/> Documentos Necessários
                            </h4>
                            <ul className="space-y-3">
                                {sacramento.conteudo.requisitos.documentos.map((doc, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 shrink-0"></span>
                                        {doc}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {sacramento.conteudo.requisitos.regrasPadrinhos && (
                            <div>
                                <h4 className="flex items-center gap-2 font-bold text-parish-dark text-sm uppercase mb-3 border-b border-gray-100 pb-2">
                                    <Users size={18} className="text-parish-terracotta"/> Regras para Padrinhos
                                </h4>
                                <ul className="space-y-2">
                                    {sacramento.conteudo.requisitos.regrasPadrinhos.map((regra, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-parish-terracotta rounded-full mt-1.5 shrink-0"></span>
                                            {regra}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="bg-[#faf9f6] p-5 rounded-xl border border-gray-200">
                             <h4 className="font-bold text-gray-400 text-xs uppercase mb-3 flex items-center gap-2">
                                <Calendar size={14}/> Passo a Passo
                             </h4>
                             <div className="space-y-4">
                                 {sacramento.conteudo.requisitos.processo.map((passo, i) => (
                                     <div key={i} className="flex items-start gap-3">
                                         <div className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-bold text-parish-gold shadow-sm shrink-0">
                                            {i + 1}
                                         </div>
                                         <p className="text-sm font-medium text-gray-700">{passo}</p>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === 'faq' && (
                    <div className="space-y-4 animate-fadeIn">
                        {sacramento.conteudo.faq.map((item, i) => (
                            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 p-3 font-bold text-parish-dark text-xs md:text-sm flex gap-2 items-center">
                                    <HelpCircle size={16} className="text-parish-gold"/>
                                    {item.p}
                                </div>
                                <div className="p-4 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                                    {item.r}
                                </div>
                            </div>
                        ))}
                        
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                            <p className="text-xs text-green-800 font-bold mb-3 uppercase">Ainda com dúvidas?</p>
                            <Link to="/contato" className="bg-white text-green-600 border border-green-200 px-6 py-2 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all">
                                Fale no WhatsApp da Secretaria
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-32 md:pb-20">
      
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-parish-dark">Vida Sacramental</h1>
        <p className="mt-3 text-sm md:text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
          Documentação necessária, regras para padrinhos e datas. Tire todas as suas dúvidas.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sacramentos.map((item) => (
            <div 
              key={item.id}
              onClick={() => { setSelectedItem(item); setActiveTab('significado'); }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-parish-gold/30 hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center group active:scale-95 duration-200"
            >
               <div className={`mb-4 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                   {item.icon}
               </div>
               <h2 className="text-xl font-serif font-bold text-parish-dark mb-2">
                   {item.title}
               </h2>
               <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                   {item.shortDesc}
               </p>
               <span className="mt-auto text-[10px] font-bold uppercase tracking-wider text-parish-terracotta border-b border-transparent group-hover:border-parish-terracotta">
                   Ver Documentos
               </span>
            </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="absolute inset-0 bg-parish-dark/90 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
            
            <div className="relative bg-white w-full md:max-w-3xl h-[85dvh] md:h-[80vh] rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp md:animate-scaleIn">
                
                <div className="bg-parish-dark text-white p-5 flex justify-between items-center shrink-0 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        {React.cloneElement(selectedItem.icon, { size: 24, className: 'text-parish-gold' })}
                        <h2 className="text-xl md:text-2xl font-serif font-bold leading-none">{selectedItem.title}</h2>
                    </div>
                    <button onClick={() => setSelectedItem(null)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <ModalContent sacramento={selectedItem} />

            </div>
        </div>
      )}

    </div>
  );
};

export default Sacramentos;
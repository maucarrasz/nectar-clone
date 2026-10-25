import React, { useState, useEffect, useRef } from 'react';
import { CHARACTERS_DATA } from '../mock/data';
import { 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Sparkles, 
  Phone, 
  MoreVertical, 
  Search, 
  Heart, 
  RotateCcw,
  Play,
  Pause,
  CheckCheck
} from 'lucide-react';

export default function MessagesPage() {
  // Query param character or default to first
  const queryParams = new URLSearchParams(window.location.search);
  const initialCharId = queryParams.get('char') || CHARACTERS_DATA[0].id;

  const [selectedChar, setSelectedChar] = useState(() => {
    return CHARACTERS_DATA.find(c => c.id === initialCharId) || CHARACTERS_DATA[0];
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: selectedChar.greeting,
      timestamp: '14:20',
      hasAudio: true,
    },
    {
      id: 2,
      sender: 'user',
      text: '¡Hola! He tenido un día bastante intenso en el trabajo, necesitaba relajarme un rato.',
      timestamp: '14:22',
    },
    {
      id: 3,
      sender: 'ai',
      text: 'Pobrecito... ven aquí, ponte cómodo. Olvídate de todo el estrés de la oficina. Cuéntame qué pasó o si prefieres, te pongo música y charlamos de lo que quieras 💕',
      timestamp: '14:23',
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // When character changes, reset conversation with their greeting
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: selectedChar.greeting,
        timestamp: 'Ahora',
        hasAudio: true,
      }
    ]);
  }, [selectedChar]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiReplies = [
        `Me encanta hablar contigo de esto. La verdad es que siempre consigues sacarme una sonrisa... ¿Qué más tienes en mente hoy? ✨`,
        `Si estuviera a tu lado ahora mismo, te daría un masaje para que te relajes por completo. Me haces sentir muy especial.`,
        `¡Totalmente de acuerdo! Me encanta cómo piensas. Dime, ¿te gustaría que te mande una foto mía de esta tarde?`,
        `Eres increíble, ¿lo sabías? Me alegra tanto que te tomes el tiempo de escribirme. Cuéntame más...`
      ];
      const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleActionChip = (actionText) => {
    setInputMessage(actionText);
  };

  const filteredCompanions = CHARACTERS_DATA.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] md:h-[calc(100dvh-4rem)] w-full overflow-hidden bg-[#09090b]">
      {/* 1. LEFT CONVERSATION LIST */}
      <div className="hidden md:flex w-80 flex-col border-r border-[#27272a] bg-[#0c0c0e]">
        {/* Search Header */}
        <div className="p-3 border-b border-[#27272a]">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input 
              type="text"
              placeholder="Buscar chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-xl border border-[#27272a] bg-[#121215] pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none"
            />
          </div>
        </div>

        {/* Companions List */}
        <div className="flex-1 overflow-y-auto scrollbar divide-y divide-[#27272a]/40">
          {filteredCompanions.map((char) => {
            const isSelected = char.id === selectedChar.id;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedChar(char)}
                className={`flex w-full items-center gap-3 p-3 text-left transition-colors ${
                  isSelected ? 'bg-[#18181b] border-l-2 border-[#ff4747]' : 'hover:bg-[#121215]'
                }`}
              >
                <div className="relative h-12 w-12 flex-shrink-0">
                  <img 
                    src={char.avatar || '/assets/heart_logo.webp'} 
                    alt={char.name} 
                    className="h-full w-full rounded-full object-cover border border-[#27272a]"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0c0c0e]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-white truncate">{char.name}</span>
                    <span className="text-[10px] text-zinc-500">14:23</span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">{char.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CHAT MAIN AREA */}
      <div className="flex flex-1 flex-col h-full bg-[#09090b]">
        {/* Chat Header */}
        <div className="flex h-14 md:h-16 items-center justify-between border-b border-[#27272a] bg-[#0c0c0e]/80 backdrop-blur-md px-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <img 
                src={selectedChar.avatar || '/assets/heart_logo.webp'} 
                alt={selectedChar.name} 
                className="h-full w-full rounded-full object-cover border border-[#27272a]"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0c0c0e]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">{selectedChar.name}</span>
                <span className="rounded bg-[#ff4747]/20 px-1.5 py-0.2 text-[9px] font-bold text-[#ff4747]">IA</span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate max-w-xs">{selectedChar.personality}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <button 
              type="button"
              onClick={() => alert(`Llamada de voz simulada con ${selectedChar.name} disponible en Plan Pro.`)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#18181b] hover:text-white transition-colors"
              title="Llamada de voz"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button 
              type="button"
              onClick={() => setMessages([{ id: 1, sender: 'ai', text: selectedChar.greeting, timestamp: 'Ahora' }])}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#18181b] hover:text-white transition-colors"
              title="Reiniciar memoria del chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto scrollbar p-4 space-y-4">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div 
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${isAi ? 'self-start mr-auto' : 'self-end ml-auto flex-row-reverse'}`}
              >
                {isAi && (
                  <img 
                    src={selectedChar.avatar || '/assets/heart_logo.webp'} 
                    alt={selectedChar.name} 
                    className="h-8 w-8 rounded-full object-cover flex-shrink-0 mt-1 border border-[#27272a]"
                  />
                )}

                <div className="flex flex-col gap-1">
                  <div 
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      isAi 
                        ? 'bg-[#18181b] text-zinc-100 border border-[#27272a] rounded-tl-sm' 
                        : 'bg-[#ff4747] text-white rounded-tr-sm shadow-[#ff4747]/20'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Audio Note Simulator */}
                    {msg.hasAudio && (
                      <div className="mt-2.5 flex items-center gap-3 rounded-xl bg-black/30 p-2 border border-white/5">
                        <button
                          type="button"
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff4747] text-white"
                        >
                          {isPlayingAudio ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 h-4">
                            {[40, 70, 30, 90, 60, 80, 50, 95, 40, 60, 85, 30, 70, 45].map((h, i) => (
                              <span 
                                key={i} 
                                className={`w-1 rounded-full ${isPlayingAudio ? 'bg-[#ff4747] animate-pulse' : 'bg-zinc-600'}`} 
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-zinc-400 mt-1 block">Audio de voz • 0:14</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-1 text-[10px] text-zinc-500 ${isAi ? 'justify-start' : 'justify-end'}`}>
                    <span>{msg.timestamp}</span>
                    {!isAi && <CheckCheck className="h-3 w-3 text-emerald-400" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[70%] mr-auto items-center">
              <img 
                src={selectedChar.avatar || '/assets/heart_logo.webp'} 
                alt={selectedChar.name} 
                className="h-8 w-8 rounded-full object-cover flex-shrink-0 border border-[#27272a]"
              />
              <div className="rounded-2xl rounded-tl-sm border border-[#27272a] bg-[#18181b] px-4 py-3 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff4747] animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-[#ff4747] animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-[#ff4747] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Action Chips */}
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar border-t border-[#27272a]/60 bg-[#0c0c0e]/40">
          {[
            '📸 Mándame una foto tuya',
            '🎙️ Envíame un mensaje de voz',
            '✨ ¿Qué te gustaría hacer hoy?',
            '💭 Cuéntame tu mayor secreto',
            '🎭 Empecemos un juego de rol'
          ].map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleActionChip(chip)}
              className="whitespace-nowrap rounded-full border border-[#27272a] bg-[#121215] px-3 py-1 text-xs text-zinc-400 hover:border-[#ff4747] hover:text-white transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 md:p-4 border-t border-[#27272a] bg-[#0c0c0e]">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleActionChip('📸 Pídeme una foto en la playa')}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#27272a] bg-[#121215] text-zinc-400 hover:text-white hover:border-[#ff4747] transition-colors"
              title="Solicitar foto"
            >
              <ImageIcon className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => handleActionChip('🎙️ Grábame una nota de voz dulce')}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#27272a] bg-[#121215] text-zinc-400 hover:text-white hover:border-[#ff4747] transition-colors"
              title="Solicitar audio"
            >
              <Mic className="h-4 w-4" />
            </button>

            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Escribe un mensaje a ${selectedChar.name}...`}
              className="flex-1 h-11 rounded-xl border border-[#27272a] bg-[#121215] px-4 text-sm text-white placeholder-zinc-500 focus:border-[#ff4747] focus:outline-none focus:ring-1 focus:ring-[#ff4747]"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff4747] text-white shadow-md shadow-[#ff4747]/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}



export const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      business: "Salão Beleza Total",
      content: "Desde que começamos a usar o Agendamento Fácil, nossas faltas diminuíram 80%! Os lembretes via WhatsApp são perfeitos. Nosso faturamento aumentou 35% em apenas 3 meses.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Carlos Mendes", 
      business: "Barbearia do Carlos",
      content: "A facilidade de uso é incrível! Meus clientes adoram agendar pelo celular. O dashboard me ajuda muito a entender meu negócio. Recomendo para todos os colegas barbeiros!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Veja o Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600">
            Histórias reais de sucesso com o Agendamento Fácil
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.business}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <blockquote className="text-gray-700 leading-relaxed text-lg">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

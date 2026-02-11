import { siteContent } from "@/content/siteContent";

export default function PoliciesPage() {
  const { intro, items, outroTitle, outroText, agreementText } = siteContent.policies;

  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">Policies</h1>
        <p className="text-gray-500 text-lg text-center mb-16 leading-relaxed">
          {intro}
        </p>

        <div className="space-y-12">
          {items.map((policy, index) => (
            <div key={index} className="border-b border-gray-100 pb-12 last:border-0 last:pb-0">
              <h2 className="text-2xl font-serif font-medium mb-4">{policy.title}</h2>
              {policy.title === "Prep For Your Appointment" ? (
                <div className="text-gray-600 leading-relaxed">
                  {(() => {
                    // Split by newline followed by dash and space to separate intro and list items
                    const parts = policy.content.split('\n- ');
                    // The first part is the intro text
                    const intro = parts[0];
                    // The rest are the list items
                    const listItems = parts.slice(1);
                    
                    return (
                      <>
                        <p className="mb-6">{intro}</p>
                        <ul className="space-y-4">
                          {listItems.map((item, i) => (
                            <li key={i} className="flex items-start group">
                              <span className="mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {policy.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-gray-200 text-center">
          <h3 className="text-2xl font-serif font-medium mb-4">{outroTitle}</h3>
          <p className="text-gray-500 text-sm mb-12 max-w-2xl mx-auto">
            {outroText}
          </p>
          
          <p className="font-bold text-lg">
            {agreementText}
          </p>
        </div>
      </div>
    </div>
  );
}

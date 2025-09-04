'use client';

import Link from 'next/link';

export default function EmailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Hot Properties Newsletter
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Preview and customize your hot properties newsletter layout. Perfect for monthly showcases featuring your best properties.
          </p>
        </div>

        {/* Hot Properties Template */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Template Header */}
          <div className="bg-[#29377c] p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Hot Properties Newsletter</h3>
            <p className="text-white/90 text-sm">Perfect for monthly showcases featuring your best properties</p>
            <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-medium mt-3">
              Property Showcase
            </span>
          </div>

          {/* Template Content */}
          <div className="p-6">
            <div className="mb-6">
              <h4 className="font-semibold text-slate-900 mb-3">Features:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  1 main featured property
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  2 secondary properties
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Service promotion blocks
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Company branding with Alan Batt blue
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Call-to-action buttons
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link
                href="/emails/preview/hot-properties"
                className="flex-1 bg-[#29377c] text-white text-center py-2 px-4 rounded-lg hover:bg-[#1f2a5e] transition-colors font-medium"
              >
                Preview Layout
              </Link>
              <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium">
                Customize
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 border border-slate-200 rounded-lg hover:border-[#29377c] transition-colors">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-slate-900 mb-2">Preview Template</h3>
              <p className="text-slate-600 text-sm mb-4">See how your newsletter will look</p>
              <Link
                href="/emails/preview/hot-properties"
                className="bg-[#29377c] text-white px-4 py-2 rounded-lg hover:bg-[#1f2a5e] transition-colors text-sm font-medium"
              >
                Preview Now
              </Link>
            </div>
            
            <div className="text-center p-6 border border-slate-200 rounded-lg hover:border-[#29377c] transition-colors">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-slate-900 mb-2">Customize</h3>
              <p className="text-slate-600 text-sm mb-4">Modify the template to your needs</p>
              <button className="bg-[#29377c] text-white px-4 py-2 rounded-lg hover:bg-[#1f2a5e] transition-colors text-sm font-medium">
                Customize Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

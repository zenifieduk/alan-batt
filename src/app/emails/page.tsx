'use client';

import Link from 'next/link';

export default function EmailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#058895] to-[#047a85] rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Newsletter Management
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Create, manage, and send professional property newsletters with your custom content. 
            Build engaging monthly newsletters that showcase your properties and market insights.
          </p>
        </div>

        {/* Monthly Newsletter Template Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          {/* Template Header */}
          <div className="bg-gradient-to-r from-[#29377c] via-[#058895] to-[#f37054] p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold mb-2">Monthly Newsletter</h3>
                      <p className="text-white/90 text-lg">Professional monthly newsletter with properties, market insights, and articles</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Featured Template
                    </span>
                    <span className="text-white/80 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-semibold">1</span> newsletter created
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Content */}
          <div className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Features */}
              <div className="lg:col-span-2">
                <h4 className="text-2xl font-bold text-slate-900 mb-8">Template Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#f37054]/10 to-[#f37054]/20 border border-[#f37054]/30">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#f37054] to-[#e65a3f] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Reusable Template</p>
                      <p className="text-sm text-slate-600">One template for all monthly newsletters</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#29377c]/10 to-[#29377c]/20 border border-[#29377c]/30">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#29377c] to-[#1e2a5c] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Property Showcase</p>
                      <p className="text-sm text-slate-600">1 featured + 2 additional properties</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#058895]/10 to-[#058895]/20 border border-[#058895]/30">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#058895] to-[#047a85] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Market Insights</p>
                      <p className="text-sm text-slate-600">Articles and market updates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-[#f37054]/10 to-[#f37054]/20 border border-[#f37054]/30">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#f37054] to-[#e65a3f] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">Easy Content Swap</p>
                      <p className="text-sm text-slate-600">Replace properties and articles monthly</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                  <h5 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h5>
                  <div className="space-y-4">
                    <Link
                      href="/emails/list"
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#058895] hover:bg-[#058895]/10 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center group-hover:from-[#058895] group-hover:to-[#047a85] transition-all duration-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 group-hover:text-[#058895] transition-colors">View All</h4>
                        <p className="text-sm text-slate-600">See created newsletters</p>
                      </div>
                    </Link>

                    <Link
                      href="/emails/preview/1"
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#29377c] hover:bg-[#29377c]/10 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-[#29377c] to-[#1e2a5c] rounded-xl flex items-center justify-center group-hover:from-[#29377c] group-hover:to-[#1e2a5c] transition-all duration-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 group-hover:text-[#29377c] transition-colors">Preview Latest</h4>
                        <p className="text-sm text-slate-600">View August Newsletter</p>
                      </div>
                    </Link>

                    <Link
                      href="/emails/create-live"
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#f37054] hover:bg-[#f37054]/10 transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-[#f37054] to-[#e65a3f] rounded-xl flex items-center justify-center group-hover:from-[#f37054] group-hover:to-[#e65a3f] transition-all duration-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 group-hover:text-[#f37054] transition-colors">Create New</h4>
                        <p className="text-sm text-slate-600">Build newsletter</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

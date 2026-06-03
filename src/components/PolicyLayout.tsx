
"use client";

import React from "react";

interface PolicyLayoutProps {
  children: React.ReactNode;
  title: string;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen pt-16 flex flex-col bg-[#052c22] text-stone-800">
      <main className="flex-grow py-16 md:py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200/50 shadow-[0_25px_60px_rgba(0,0,0,0.02)] p-8 md:p-12">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-black text-stone-900 mb-8 pb-4 border-b border-stone-200/60 text-center font-medium tracking-tight">
            {title}
          </h1>
          <div className="prose prose-lg max-w-none text-stone-600 leading-relaxed font-sans text-[14.5px] space-y-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolicyLayout;
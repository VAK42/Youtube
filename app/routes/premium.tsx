import { Button } from '../components/ui/Button';
import { Check, Download, Music, PlayCircle } from 'lucide-react';
import type { Route } from './+types/premium';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "YouTube Premium - Youtube" }];
}
export default function Premium() {
  const features = [
    { icon: PlayCircle, title: 'Ad-Free Videos', description: 'Watch Millions Of Videos Without Ads' },
    { icon: Download, title: 'Downloads', description: 'Save Videos To Watch Offline' },
    { icon: Music, title: 'YouTube Music Premium', description: 'Ad-Free Music Listening' },
  ];
  const plans = [
    { name: 'Individual', price: '$11.99', period: 'Month', popular: false },
    { name: 'Family', price: '$22.99', period: 'Month', popular: true },
    { name: 'Student', price: '$6.99', period: 'Month', popular: false },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900/20 to-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">YouTube Premium</h1>
          <p className="text-xl text-zinc-400">Elevate Your Experience</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="bg-zinc-900 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-zinc-900 rounded-2xl p-8 relative ${plan.popular ? 'ring-2 ring-red-600' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-zinc-400">/{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {features.map((feature) => (
                  <li key={feature.title} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature.title}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full rounded-full ${plan.popular ? 'bg-red-600 hover:bg-red-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                Get Premium
              </Button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 text-sm text-zinc-500">
          Free Trial Available! Cancel Anytime!
        </div>
      </div>
    </div>
  )
}
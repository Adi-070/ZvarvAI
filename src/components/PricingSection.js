'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles } from 'lucide-react'

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Free",
      price: { monthly: "$0", yearly: "$0" },
      description: "Basic features for casual users",
      features: ["5 AI conversations per day", "Access to basic characters", "24/7 customer support"],
    },
    {
      name: "Premium",
      price: { monthly: "$10", yearly: "$100" },
      description: "Advanced features for enthusiasts",
      features: ["Unlimited AI conversations", "Access to all characters", "Priority customer support", "Exclusive content"],
      recommended: true,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Choose Your Plan
        </h2>
        <p className="text-center text-gray-500 mb-8 max-w-md mx-auto">
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-md">
            <Button
              variant={isYearly ? "ghost" : "default"}
              size="sm"
              onClick={() => setIsYearly(false)}
              className="rounded-full"
            >
              Monthly
            </Button>
            <Button
              variant={isYearly ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsYearly(true)}
              className="rounded-full"
            >
              Yearly
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`w-full max-w-sm mx-auto flex flex-col transform transition-all duration-300 hover:scale-105 ${plan.recommended ? 'border-purple-500 shadow-lg' : ''}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  {plan.name}
                  {plan.recommended && (
                    <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-1 rounded-full flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Recommended
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold mb-4 text-center">
                  <span className="text-sm align-top">$</span>
                  <span className="tabular-nums">{isYearly ? plan.price.yearly.slice(1) : plan.price.monthly.slice(1)}</span>
                  <span className="text-sm font-normal text-gray-500">/{isYearly ? 'year' : 'month'}</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.recommended ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                  {plan.name === "Free" ? "Get Started" : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection


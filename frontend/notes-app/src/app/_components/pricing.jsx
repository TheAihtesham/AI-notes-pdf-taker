import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PricingSection() {
    return (
        <section id="pricing" className="py-16 bg-gray-50 px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Pricing Plans</h2>
            <p className="text-gray-600 mb-10">Simple and transparent pricing. No hidden fees.</p>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                
                <Card className="border border-gray-200 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl">Pro</CardTitle>
                        
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-3xl font-bold">₹299/mo</p>
                        <ul className="text-left space-y-2 text-sm text-gray-600">
                            <li>✓ Unlimited PDF uploads</li>
                            <li>✓ Priority AI responses</li>
                            <li>✓ Summarization + History</li>
                        </ul>
                        <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                            Upgrade
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border border-blue-500 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Free</CardTitle>
                        
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-3xl font-bold">₹0</p>
                        <ul className="text-left space-y-2 text-sm text-gray-600">
                            <li>✓ Upload up to 3 PDFs</li>
                            <li>✓ Basic AI answers</li>
                            <li>✓ PDF Preview</li>
                        </ul>
                        <Button className="w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white">
                            Get Started
                        </Button>
                    </CardContent>
                </Card>

                
                <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Enterprise</CardTitle>
                       
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-2xl font-bold text-red-500">Coming Soon..</p>
                        <ul className="text-left space-y-2 text-sm text-gray-600">
                            <li>✓ Dedicated Support</li>
                            <li>✓ Custom AI Model</li>
                            <li>✓ Team Access</li>
                        </ul>
                        <Button variant="outline" className="w-full mt-4 hover:bg-gray-100">
                            Contact Sales
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

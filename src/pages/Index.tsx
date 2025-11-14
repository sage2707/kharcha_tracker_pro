import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Wallet, 
  TrendingUp, 
  PieChart, 
  Bell, 
  Download, 
  Shield,
  Smartphone,
  Moon,
  Sun
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";
import { storage } from "@/utils/storage";

const Index = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = storage.getTheme();
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    storage.setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const features = [
    {
      icon: Wallet,
      title: "Smart Wallet Tracking",
      description: "Set your monthly budget and visualize spending vs. savings with intuitive donut charts"
    },
    {
      icon: PieChart,
      title: "Category Insights",
      description: "Track expenses by category with custom colors and see where your money goes"
    },
    {
      icon: TrendingUp,
      title: "7-Day Trends",
      description: "Visualize your spending patterns over the last week with beautiful bar charts"
    },
    {
      icon: Bell,
      title: "Spend Wisely Alerts",
      description: "Get smart advice when wallet is low, plus SIP investment suggestions for leisure spending"
    },
    {
      icon: Download,
      title: "Export Data",
      description: "Download all your expenses as CSV for further analysis or record keeping"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "All data stored locally on your device. No servers, no accounts, complete privacy"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Kharcha Tracker" className="w-10 h-10" />
            <span className="text-xl font-bold text-foreground">Kharcha Tracker</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/app">
              <Button variant="default" className="gap-2">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 flex justify-center">
              <img src={logo} alt="Kharcha Tracker" className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Track Your Expenses,
              <span className="text-primary"> Stay in Control</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Tracking your daily expense so that it doesn't hurt on the month end.
              A premium expense tracker designed for students and professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Get Started Free
                  <TrendingUp className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                <span>Works Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <span>No Account Needed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Kharcha Tracker Section */}
      <section id="learn-more" className="py-24 bg-gradient-to-br from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What is Kharcha Tracker?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kharcha Tracker is a privacy-first expense management app designed specifically for students and young professionals. 
              Unlike other expense trackers that require accounts and send your data to servers, Kharcha Tracker stores everything 
              locally on your device. This means your financial data stays completely private and accessible even offline.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Built with a modern fintech-inspired design, it combines beautiful visualizations with actionable insights to help you 
              not just track expenses, but make smarter financial decisions. From wallet bifurcation charts to SIP investment suggestions, 
              every feature is designed to empower you with financial awareness.
            </p>
          </div>

          {/* Saving Tips */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                💰 Smart Saving Tips for Students
              </h3>
              <p className="text-muted-foreground">Practical strategies to build your savings habit</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">The 50-30-20 Rule</h4>
                    <p className="text-sm text-muted-foreground">
                      Allocate 50% to needs (rent, food), 30% to wants (entertainment, shopping), and 20% to savings. 
                      This simple rule helps maintain financial balance while still enjoying life.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🍜</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Cook More, Order Less</h4>
                    <p className="text-sm text-muted-foreground">
                      Food delivery can cost 3-4x more than cooking. Even cooking 4 meals a week can save ₹2,000-3,000 monthly. 
                      Meal prep on weekends to make weekday cooking easier.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🛍️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Wait 24 Hours Before Buying</h4>
                    <p className="text-sm text-muted-foreground">
                      Impulse purchases add up quickly. Before buying anything non-essential, wait 24 hours. 
                      You will often realize you did not really need it, saving hundreds each month.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎫</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Use Student Discounts</h4>
                    <p className="text-sm text-muted-foreground">
                      Always ask for student discounts at restaurants, movie theaters, and online services. 
                      Platforms like Amazon Prime, Spotify, and Adobe offer 50% off for students.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Review Subscriptions Monthly</h4>
                    <p className="text-sm text-muted-foreground">
                      Cancel unused OTT, gym, or app subscriptions. Most people pay for 3-4 services they rarely use. 
                      That is ₹500-1,000 saved every month.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🚇</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Use Public Transport</h4>
                    <p className="text-sm text-muted-foreground">
                      Auto and cab rides cost 5-10x more than metro or buses. Using public transport for daily commute 
                      can save ₹3,000-5,000 monthly while being eco-friendly.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Investment Tricks */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                📈 Investment Tricks to Build Wealth
              </h3>
              <p className="text-muted-foreground">Start your wealth-building journey early</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Start SIP Early (Even with ₹500)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Systematic Investment Plans in mutual funds let you invest as little as ₹500/month. 
                      Starting at 20 with just ₹1,000/month at 12% returns can give you ₹1 crore by 50.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Example: ₹2,000/month for 10 years = ₹4.6L+ (at 12% return)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Power of Compound Interest</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Albert Einstein called it the 8th wonder. Money grows exponentially over time. 
                      ₹10,000 today at 12% becomes ₹31,000 in 10 years without adding a single rupee.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Tip: Start investing before 25 to maximize compound growth
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Diversify: Don't Put All Eggs in One Basket</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Split investments between equity mutual funds (60%), debt funds (30%), and gold (10%). 
                      This balances risk and ensures stable growth even in market downturns.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Beginners: Start with index funds like Nifty 50 for low risk
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Invest in Yourself First</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Before financial investments, invest in skills that increase your earning potential. 
                      Online courses, certifications, and books give infinite ROI through better career opportunities.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Rule: Spend 10% of income on self-improvement
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🛡️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Build Emergency Fund First</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Before investing, save 3-6 months of expenses in a liquid fund or savings account. 
                      This protects you from taking loans during emergencies and gives peace of mind.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Target: ₹30,000-50,000 for students living independently
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Goal-Based Investing</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Set specific goals like laptop in 6 months, trip in 1 year, or higher studies in 3 years. 
                      Goal-based investing keeps you motivated and helps choose right investment instruments.
                    </p>
                    <p className="text-xs text-primary font-medium">
                      Short-term: Liquid funds | Long-term: Equity funds
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Ready to Take Control of Your Finances?
              </h3>
              <p className="text-muted-foreground mb-6">
                Start tracking your expenses today and get personalized insights to save and invest smarter
              </p>
              <Link to="/app">
                <Button size="lg" className="gap-2">
                  Launch Kharcha Tracker
                  <TrendingUp className="h-5 w-5" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Manage Money
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you understand and control your spending habits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:border-primary/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Smart Insights,
                <span className="text-primary"> Better Decisions</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Kharcha Tracker doesn't just track your expenses—it helps you make smarter financial decisions with actionable insights.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">SIP Investment Suggestions</h4>
                    <p className="text-muted-foreground">Get personalized advice on how investing just 10% of leisure spending could build long-term wealth</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Real-time Alerts</h4>
                    <p className="text-muted-foreground">Know exactly when your wallet balance is running low before it's too late</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Custom Categories</h4>
                    <p className="text-muted-foreground">Track expenses your way—add unlimited custom categories that fit your lifestyle</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8 bg-gradient-to-br from-card to-primary/5">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="text-3xl font-bold text-primary">₹12,450</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-full bg-orange-500" />
                      <span className="text-foreground">Food</span>
                    </div>
                    <span className="font-semibold text-foreground">₹4,200</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-full bg-purple-500" />
                      <span className="text-foreground">Shopping</span>
                    </div>
                    <span className="font-semibold text-foreground">₹3,800</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-full bg-blue-500" />
                      <span className="text-foreground">Travel</span>
                    </div>
                    <span className="font-semibold text-foreground">₹2,650</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-full bg-green-500" />
                      <span className="text-foreground">Rent</span>
                    </div>
                    <span className="font-semibold text-foreground">₹1,800</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">💡 Tip:</span> Your leisure spending is ₹8,000. Investing 10% (₹800) in SIP could build long-term wealth.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Take Control of Your Expenses?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start tracking today. No signup, no credit card, completely free.
          </p>
          
          <Link to="/app">
            <Button size="lg" className="gap-2 text-lg px-12">
              Launch Kharcha Tracker
              <TrendingUp className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Kharcha Tracker" className="w-8 h-8" />
              <span className="text-sm text-muted-foreground">
                © 2024 Kharcha Tracker — Track. Save. Grow.
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

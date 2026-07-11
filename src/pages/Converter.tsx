import { useState } from "react";
import { TerminalWindow, useEffectClasses } from "../components/TerminalWindow";
import { AnimatedSection } from "../components/AnimatedSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, Calculator, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type ConversionType = {
  from: string;
  to: string;
  decimalRate: number;
  binaryRate: number;
  title: string;
};

const conversions: { [key: string]: ConversionType } = {
  "GB to MB": { from: "GB", to: "MB", decimalRate: 1000, binaryRate: 1024, title: "Gigabytes to Megabytes Converter" },
  "MB to GB": { from: "MB", to: "GB", decimalRate: 0.001, binaryRate: 1/1024, title: "Megabytes to Gigabytes Converter" },
  "GB to TB": { from: "GB", to: "TB", decimalRate: 0.001, binaryRate: 1/1024, title: "Gigabytes to Terabytes Converter" },
  "GB to KB": { from: "GB", to: "KB", decimalRate: 1000000, binaryRate: 1024*1024, title: "Gigabytes to Kilobytes Converter" }
};

const Converter = () => {
  const [inputValue, setInputValue] = useState<string>("512");
  const [result, setResult] = useState<{ decimal: number; binary: number } | null>(null);
  const [currentConversion, setCurrentConversion] = useState<string>("GB to MB");
  const { glassClass } = useEffectClasses();

  const convert = () => {
    const input = parseFloat(inputValue);
    if (isNaN(input) || input < 0) return;
    
    const conversion = conversions[currentConversion];
    const decimalResult = input * conversion.decimalRate;
    const binaryResult = input * conversion.binaryRate;
    
    setResult({ decimal: decimalResult, binary: binaryResult });
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const input = parseFloat(value);
    if (!isNaN(input) && input >= 0) {
      const conversion = conversions[currentConversion];
      const decimalResult = input * conversion.decimalRate;
      const binaryResult = input * conversion.binaryRate;
      setResult({ decimal: decimalResult, binary: binaryResult });
    } else {
      setResult(null);
    }
  };

  const handleConversionChange = (newConversion: string) => {
    setCurrentConversion(newConversion);
    const currentInputValue = parseFloat(inputValue) || 1;
    setInputValue(currentInputValue.toString());
    const conversion = conversions[newConversion];
    const decimalResult = currentInputValue * conversion.decimalRate;
    const binaryResult = currentInputValue * conversion.binaryRate;
    setResult({ decimal: decimalResult, binary: binaryResult });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px]" />
      </div>
      
      <div className="relative z-10">
        <div className="p-4">
          <Link to="/">
            <Button variant="outline" className="premium-button font-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <AnimatedSection animation="slide-in-up">
            <TerminalWindow title="converter.exe">
              <div className="space-y-8">
                <AnimatedSection delay={1}>
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/10">
                        <Calculator className="w-6 h-6 text-white/60" />
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold font-code text-white">
                        {conversions[currentConversion].title}
                      </h1>
                    </div>
                    <div className="w-24 h-1 bg-white/20 mx-auto rounded-full shadow-lg shadow-white/5" />
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={2}>
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="input-value" className="text-white/70 font-mono">
                        {conversions[currentConversion].from}
                      </Label>
                        <Input
                          id="input-value"
                          type="number"
                          min="0"
                          step="any"
                          value={inputValue}
                          onChange={(e) => handleInputChange(e.target.value)}
                          placeholder={`Enter ${conversions[currentConversion].from} value`}
                          className="bg-white/5 border-white/10 text-white font-mono text-lg text-center focus:border-white/30 focus:ring-2 focus:ring-white/10"
                        />
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={convert}
                        className="bg-white/10 hover:bg-white/15 text-white font-mono px-8 py-2 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Convert
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>

                {result && (
                  <AnimatedSection animation="fade-in" delay={3}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-2 text-white/70 font-mono">
                        <span className="text-white/80">{conversions[currentConversion].from}</span>
                        <ArrowRight className="w-4 h-4 text-white/40" />
                        <span className="text-white/80">{conversions[currentConversion].to}</span>
                      </div>
                      
                      <div className={`glass-card p-6 rounded-xl space-y-3 ${glassClass}`}>
                        <div className="text-white font-mono">
                          <span className="text-white/90 font-bold">{parseFloat(inputValue).toLocaleString()} {conversions[currentConversion].from}</span>
                          <span className="text-white/40"> = </span>
                          <span className="text-white/90 font-bold">{result.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })} {conversions[currentConversion].to}</span>
                          <span className="text-white/40 text-sm"> (decimal)</span>
                        </div>
                        <div className="text-white font-mono">
                          <span className="text-white/90 font-bold">{parseFloat(inputValue).toLocaleString()} {conversions[currentConversion].from}</span>
                          <span className="text-white/40"> = </span>
                          <span className="text-white/90 font-bold">{result.binary.toLocaleString(undefined, { maximumFractionDigits: 6 })} {conversions[currentConversion].to}</span>
                          <span className="text-white/40 text-sm"> (binary)</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                )}

                <AnimatedSection delay={4}>
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-mono text-white/70">Quick Conversions</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {Object.keys(conversions).map((conversionKey) => (
                        <Button
                          key={conversionKey}
                          variant={currentConversion === conversionKey ? "default" : "outline"}
                          size="sm"
                          className={`font-mono text-xs transition-all duration-200 ${
                            currentConversion === conversionKey 
                              ? "bg-white/15 text-white border-white/20 shadow-lg" 
                              : "premium-button"
                          }`}
                          onClick={() => handleConversionChange(conversionKey)}
                        >
                          {conversionKey}
                        </Button>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </TerminalWindow>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Converter;

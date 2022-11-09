import "./App.css";
import DisplayBlock from "./component/DisplayBlock";
import PriceEntryField from "./component/PriceEntryField";
import VatRateField from "./component/VatRateField";
import { useState } from "react";

function App() {
  // States
  const [netPrice, setNetPrice] = useState(0.0);
  const [grossPrice, setGrossPrice] = useState(0.0);
  const [vatToPay, setVatToPay] = useState(0);
  const [vatRate, setVatRate] = useState(20);

  // Functions
  const handleNetPriceChange = (price) => {
    const grossPrice = price * (vatRate / 100 + 1);
    setNetPrice(price);
    setGrossPrice(grossPrice);
    //TODO: calc vat to pay and set state
    setVatToPay(grossPrice - price);
  };

  const handleGrossPriceChange = (price) => {
    const netPrice = price / (vatRate / 100 + 1);
    setNetPrice(netPrice);
    setGrossPrice(price);
    //TODO: calc vat to pay and set state
    setVatToPay(price - netPrice);
  };

  const handleVatRateChange = (rate) => {
    setVatRate(rate);
    handleNetPriceChange(netPrice);
  };

  const updatePrices = () => {
    handleNetPriceChange(netPrice);
  };

  // Return
  return (
    <div className="header field">
      <h1>VAT CALCULATOR</h1>
      <div className="pale-green-border">
        <VatRateField
          vatRateChanged={handleVatRateChange}
          customstyle="field"
          updatePrices={updatePrices}
          value={vatRate}
        />
        <PriceEntryField
          customstyle="field"
          label="Price excl VAT: "
          price={netPrice === 0.0 ? "" : netPrice}
          priceChanged={handleNetPriceChange}
        />
        <DisplayBlock
          customstyle="field"
          value={vatToPay}
          label="Vat to pay: "
        />
        <PriceEntryField
          customstyle="field"
          label="Price incl VAT: "
          price={grossPrice === 0.0 ? "" : grossPrice}
          priceChanged={handleGrossPriceChange}
        />
      </div>
    </div>
  );
}

export default App;

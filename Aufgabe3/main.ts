namespace eisdealer {
    
    let anzahl: number = 0;
    let gesamtPreis: number = 0;
    let inputs: HTMLCollectionOf<HTMLInputElement>;
    let preisElement: HTMLSpanElement;
    let zusammenfassungElement: HTMLElement;
    let zusammenFassung: string = "";

    window.addEventListener("load", init);

    function init(_event: Event): void {
        console.log("init2");
        let fieldsets: HTMLCollectionOf<HTMLFieldSetElement> = document.getElementsByTagName("fieldset");

        for (let i: number = 0; i < fieldsets.length; i++) {
            let fieldset: HTMLFieldSetElement = fieldsets[i];
            fieldset.addEventListener("input", handleInput);
        }
        let button: HTMLElement = document.getElementById("button");
        button.addEventListener("click", validateForm);
        inputs = document.getElementsByTagName("input");
        preisElement = document.getElementById("preis-total");
        zusammenfassungElement = document.getElementById("zusammenfassung");
    }

    function handleInput(_event: Event): void {
        gesamtPreis = 0;
        zusammenFassung = "";
        for (let i: number = 0; i < inputs.length; i++) {
            anzahl = 0;
            let input: HTMLInputElement = inputs[i];
            let preis: number = +input.getAttribute("data-preis");
            if (preis) {
                if (input.type == "checkbox") {
                    if (input.checked) {
                        anzahl = 1;
                    }
                } else {
                    anzahl = +input.value;
                }
                gesamtPreis = gesamtPreis + preis * anzahl;
                if (anzahl > 0) {
                    zusammenFassung = zusammenFassung + anzahl + " " + input.labels[0].innerText + "\r\n";
                    console.log(input.labels[0].innerText);
                }
            }
        }
        zusammenfassungElement.innerText = zusammenFassung;
        preisElement.innerText = String(gesamtPreis.toFixed(2));
    }

    function validateForm(): void {
        for (let i: number = 0; i < inputs.length; i++) {
            let input: HTMLInputElement = inputs[i];
            input.className = "validated";
        }
    }
}
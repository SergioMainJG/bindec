class Observer
{
    /**
     * 
     * @param { Function } fn
     * @returns { void } 
     */
    constructor( fn )
    {
        this.fn = fn;
    };

    /**
     * 
     * @param { string } data 
     */
    refresh( data )
    {
        this.fn( data );
    };

};



class Summarizer
{
    constructor()
    {
        /**
         * @type { Observer[] }
         */
        this.observer = [];
    };

    /**
     * 
     * @param { Observer } observer
     * @returns  { void } 
     */
    subscribe( observer )
    {
        this.observer.push( observer );
    };

    /**
     * 
     * @param { Observer } observerToDelete
     * @returns  { void }
     */
    unsuscribe( observerToDelete )
    {
        this.observer.filter( observer => observer !== observerToDelete ); 
    };

    /**
     * 
     * @param { string } data
     * @returns { void }
     */
    notify( data )
    {
        this.observer.forEach(
            ( observer ) =>
            {
                observer.refresh( data );
            }
        );
    };

};

/**
 * @type { HTMLInputElement }
 */
const input = document.getElementById('mytext');

/**
 *  @type { HTMLTextAreaElement } resultDiv 
 */
const resultArea = document.getElementById('result');
/**
 *  @type { HTMLTextAreaElement } registerDiv 
 */
const registerArea = document.getElementById('log');

const summarizer = new Summarizer();
const resultObserver = new Observer(
    /**
     * 
     * @param { string } data 
     */
    ( data ) =>
    {
        const decimalPattern = /^-?\d+(\.\d+)?$/;
        const binaryPattern = /^-?[01]+(\.[01]*)?$/;
        data = data.trim();
        
        if ( binaryPattern.test( data ) ) resultArea.value = `${ parseInt( data, 2 ).toFixed(2) }`;
        else if ( decimalPattern.test( data ) ) resultArea.value = (+data).toString(2);
        else if ( data === '' ) resultArea.value = '';
        else resultArea.value = `Invalid input!`;
    }
);

summarizer.subscribe( resultObserver );

function convert()
{
    summarizer.notify( input.value );
};

function registrar() {
    
    const inputValue = input.value.trim();
    const resultValue = resultArea.value.trim();

    if (resultValue !== 'Invalid input!' && (inputValue !== '' && resultValue !== '')) {
        
        registerArea.value += `Input: ${inputValue} => Result: ${resultValue}\n`;

        input.value = '';
        result.value = '';
    } else {
        window.alert('No hay valores que registrar!');
    }
}
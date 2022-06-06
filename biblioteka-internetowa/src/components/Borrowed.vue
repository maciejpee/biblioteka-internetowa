<template>
<div>
    <h4>Twoje wypożyczone książki:</h4>
    <div v-for="book of borrowedBooks" :key="book.id" id='book'>
            <BorrowedBook :borrowDate="book.borrowDate" :returnDate="book.returnDate" :bookId="book.bookId"/>
            <button class="btn btn-success" @click="returnBook(book.bookId)">Zwróć</button>
    </div>

   
</div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import BorrowedBook from "./BorrowedBook.vue"
    const props = defineProps(["userId", "borrowed"])
    const borrowedBooks = ref([])
    const waitingBooks = ref([])

    let currentDate = new Date() // tworzenie obiektu daty do uzycia na potem
    let borrowDate = firebase.firestore.Timestamp.fromDate(currentDate) // uzywanie funkcji do tworzenia/konwertowania
    // firebasowej daty (timestampa) z innego obiektu (w tym wypadku daty dzisiejszej)
        
    currentDate.setMonth(currentDate.getMonth()+1) // to samo ale miesiac pozniej, bo taki ustalismy 
    //defaultowy limit zwracania ze po miesiacu sie zwroci

    let returnDate = firebase.firestore.Timestamp.fromDate(currentDate) // to samo tylko dla miesiaca pozniej
     
    onMounted(()=>{


        // zawsze wykonuje sie jak jestesmy na stronie
        for (let b of props.borrowed){ // iteracja po przeslanych ksiazkach (z property z profilu), 
        //czyli tylko ksiazki obecnie zalogowanego uzytkownika. To jest tylko do wyswietlania ich na stronie, 
        // nie ma nic wspolnego ze zwracaniem itd.
            db.collection('books').doc(b.bookId).get().then((doc)=>{ // dla kazdej ksiazki ze dopasowanym 
            //id (b.bookId - iterujemy tylko po tych ktore ma uzytkownik wypozyczone 
            //wiec b jest obiektem dla kazdej ksiazki z tych wypozyczonych)
                var data = { //tworzymy tutaj data zeby pozniej po prostu dopisywac do tej listy wyzej,
                // poniewaz w taki sposob mozna latwo wyswietlac te ksiazki w normalnej petli. 
                // Inaczej budujemy se arraya do wyswietlania
                    'bookId': b.bookId,
                    'borrowDate': b.borrowDate,
                    'returnDate': b.returnDate,
                }
                borrowedBooks.value.push(data)
            })
        }
    })
   
    function returnBook(bookId){ // funkcja przyjmuje przeslanie ID z przycisku 'zwróć'
        var bookDate = null // przyda sie potem
        // cala idea tego do pierwszego thena, jest taka ze bierze uzytkownika zalogowanego
        // i buduje arraya ktorego potem bedzie mozna wrzucic do firebase. 
        //Ten array ma zawierac wszystkie ksiazki oprocz tej zmatchowanej, tej ktorej id kliknelismy (bookId).
        
        db.collection('users').doc(props.userId).get().then((doc)=>{
            borrowedBooks.value = [] // uzywamy tej samej tablicy, zerujemy ja
            for (let b of doc.data().borrowed){ // doc.data().borrowed - tam sa wszystkie 
            // wypozczyone ksiazki dla uzytkownika o props.userId czyli obecnie zalogowanego w tym wypadku
                if (b.bookId == bookId){ // jesli zmatchowalo, czyli jesli znalazlo w borrowed ksiazke z takim samym id jak to przeslane do funkcji jest continue,
                // czyli skipuje kod nizej (nie tworzy obiektu data dla tego id tylko przechodzi do kolejnego kroku petli).
                // Czyli dokladnie to co chcemy, a chcemy zbudowac arraya bez tej jednej ksiazki 
                //zeby zasymulowac ze ona znika, czyli jest zwracana
                    bookDate = b.borrowDate
                    continue
                } // taka sama zasada
                var data = {
                        bookId: b.bookId,
                        borrowDate: b.borrowDate,
                        returnDate: b.returnDate
                    }
                borrowedBooks.value.push(data)//tutaj tez
            }
        }).then(()=>{ // teraz, pierwszy then. jak wykona to wyzej THEN wykonuje to 
        // czyli po prostu nadpisuje obecne borrowed uzytkownika tym, ktore sobie stworzylismy (tym bez tej jednej ksiazki)
            let unique_id = "id" + Math.random().toString(16).slice(2)
            db.collection('users').doc(props.userId).update({
                borrowed: borrowedBooks.value,
                [`borrow_history.${unique_id}.bookId`]: bookId,
                [`borrow_history.${unique_id}.borrowDate`]: bookDate,
                [`borrow_history.${unique_id}.returnedDate`]: borrowDate,
                [`borrow_history.${unique_id}.paid`]: 0,
                
                
                
                //firebase.firestore.FieldValue.arrayUnion({
                    //bookId: bookId, 
                    //borrowDate: bookDate, 
                    //returnedDate: borrowDate, 
                    //paid: false
                   // })   
           })
           
        }).then(()=>{ // drugi then. jesli udalo sie wykonac to wyzej to lecimy dalej
        // i z ksiazki na ktora kliknelismy (bookId przeslany z funkcji)
        // wywolujemy funkcje arrayRemove na jej tablicy copies (tam sa wszystkie dostepne kopie,
        // jesli np. ksiazka ma 4 pola w copies w firestore znaczy ze sa dostepne 4 egzemplarze.
        // Jesli w danym polu jest data - ksiazka wypozyczona, jesli null albo '' to znaczy ksiazka dostepna do wypozyczenia)
                db.collection('books').doc(bookId).update({
                   copies: firebase.firestore.FieldValue.arrayRemove(bookDate) // usuwa pierwsze dopasowane pole, ktore ma wartosc bookDate
                   //czyli po prostu usuwa date z ktoregos z pol (nie ma to znaczenia, ilosc kopii sie nie zmienia)
                })
                db.collection('books').doc(bookId).update({ // w tym samym czasie dodajemy jedno pole (arrayUnion) z wartoscia ''
                // (nulle sie jakos buguja dlatego ''). 
                //Czyli nic innego jak po prostu oddajemy pole ktore usunelismy z tym
                // ze ono teraz nie ma daty tylko '' co oznacza ze mozna wypozyczyc
                    copies: firebase.firestore.FieldValue.arrayUnion('')
                })
           }).then(()=>{ // trzeci then, odpowiedzialny za kolejke. Zasada bardzo podobona.
            db.collection('books').doc(bookId).get().then((doc)=>{ // dla ksiazki o zmatchowanym id 
            //(przeslanym z funkcji tym co klikenlismy)
                if(doc.data().queue.length > 0){ // sprwadza czy ktos czeka w kolejce
                    // wazne ze w queue sa zapisane id uzytkownikow ktorzy sie tam zapisali

                        var b = doc.data().queue[0] // bierzemy pierwszego ziomka z kolejki (jego id)

                        if(doc.data().copies.includes('') || doc.data().copies.includes(null)){ //jesli pole zawiera albo '' albo null
                        // to zapłon
                            db.collection('books').doc(bookId).update({ 
                                queue: firebase.firestore.FieldValue.arrayRemove(b) // usuwamy ziomka z kolejki na bo on teraz wypozycza
                            }).then(()=>{ // pierwszy then w trzecim thenie
                                db.collection('books').doc(bookId).update({ // dodajemy do copies borrowDate dzisiejsza
                                // (symulacja ze ktos wypozycza - ten ziomek na ktorym dokonalismy aborcji)
                                    copies: firebase.firestore.FieldValue.arrayUnion(borrowDate),
                                }).then(()=>{ // pierwszy then w pierwszym thenie w trzecim thenie
                                    // tutaj wazne bo wczesniej dodalismy '' do arraya (symulacja ze zwalnia sie miejsce)
                                    // teraz to miejsce trzeba usunac (podmienic) bo ma je zajac chlop z kolejki (jego data)
                                    db.collection('books').doc(bookId).update({
                                        copies: firebase.firestore.FieldValue.arrayRemove('')
                                })
                                }).then(()=>{ // drugi then w pierwszym thenie w trzecim thenie
                                    db.collection('users').doc(b).update({ // na koncu w borrowed uzytkownika
                                    // ktory byl w kolejce jako 1 (b zawiera jego id) dodajemy do jego arraya
                                    // borrowed wszystkie dane tj, id ksiazki date dodania i date zwrotu
                                    // (symulacja ze naprawde je ma) przez co reszta logiki w apce dziala
                                    // bo jest zalezna od tego czy user ma w borrowed dana ksiazke
                                            borrowed: firebase.firestore.FieldValue.arrayUnion({bookId:bookId, borrowDate:borrowDate, returnDate:returnDate})  
                                })
                                    db.collection('users').doc(b).get().then((doc)=>{
                                        waitingBooks.value = [] 
                                        for (let w of doc.data().waiting){ 
                                            if (w == bookId){ 
                                                continue
                                            }
                                        var data = {
                                            bookId: b.bookId,
                                            borrowDate: b.borrowDate,
                                            returnDate: b.returnDate
                                        }
                                        waitingBooks.value.push(data)
                                    }}).then(()=>{ 
                                            db.collection('users').doc(b).update({
                                                waiting: waitingBooks.value,
                                            })
                                        })
                                })
                                // koniec jungli jak cos nie jasne to na grupce pytajcie
                                // then counter: 9 :^), tylko czekać az wybuchnie
                            })
                                
                        }
                        
                      
                }
            })
        })
        
    }

    function getRealDate(date) {
      var realDate = new Date(date * 1000)
      return realDate.getDate() + '/' + (realDate.getMonth() + 1) + '/' + realDate.getFullYear()
    }
</script>

<style scoped>
</style>
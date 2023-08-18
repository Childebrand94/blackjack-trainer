const Settings = () => {
  return (
    <div className="bg-green-700 h-screen flex items-center flex-col pt-8">
      <h1 className="text-3xl mb-10 font-semibold">House Rules </h1>
      <form className="w-2/4" action="">
        <div className="flex flex-col">
          <div className="flex justify-between my-2">
            <label htmlFor="decks">Decks</label>
            <div>
              <span>1</span>
              <input id="decks" name="decks" value="" className="mx-1" type="radio" />
              <span>2</span>
              <input id="decks" name="decks" value="" className="mx-1" type="radio" />
              <span>3</span>
              <input id="decks" name="decks" value="" className="mx-1" type="radio" />
              <span>4+</span>
              <input id="decks" name="decks" value="" className="mx-1" type="radio" />
            </div>
          </div>
          <div>
            <div className="flex justify-between my-2">
              <label htmlFor="soft 17">Dealer Hits Soft 17</label>
              <div>
                <input id="soft 17" name="soft 17" value={true} className="mx-1" type="radio" />
                <input id="soft 17" name="soft 17" className="mx-1" type="radio" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-2">
              <label htmlFor="double">Double</label>
              <div>
                <span>Never</span>
                <input id="double" name="double" value="" className="mx-1" type="radio" />
                <span>10/11</span>
                <input id="double" name="double" value="" className="mx-1" type="radio" />
                <span>9/10/11</span>
                <input id="double" name="double" value="" className="mx-1" type="radio" />
                <span>Any</span>
                <input id="double" name="double" value="" className="mx-1" type="radio" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-2">
              <label htmlFor="double after split">Double after split</label>
              <div>
                <input id="double after split" name="double after split" value={true} className="mx-1" type="radio" />
                <input id="double after split" name="double after split" value={false} className="mx-1" type="radio" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between my-2">
              <label htmlFor="Surrender">Surrender</label>
              <div>
                <span>Never</span>
                <input id="Surrender" name="Surrender" value="" className="mx-1" type="radio" />
                <span>Late</span>
                <input id="Surrender" name="Surrender" value="" className="mx-1" type="radio" />
                <span>Early</span>
                <input id="Surrender" name="Surrender" value="" className="mx-1" type="radio" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Settings

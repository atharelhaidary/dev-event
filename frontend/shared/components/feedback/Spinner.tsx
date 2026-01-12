
const Spinner = () => {
        return (
          <div className="w-full  h-full flex flex-grow justify-center items-center ">
            <div className="relative w-10 h-10 animate-spin" style={{scale:4}}>
              {
                [
                  {
                    opcaity :'',
                    style: 'top-0 left-0'
                  },
                  {
                    opcaity :'opacity-70',
                    style: 'top-0 right-0'
                  },
                  {
                    opcaity :'opacity-50',
                    style: 'bottom-0 right-0'
                  },
                  {
                    opcaity :'opacity-30',
                    style: 'bottom-0 left-0'
                  },
                ].map((item,index)=>(
                  <div key={index} className={`absolute ${item.style} w-4 h-4 bg-white rounded-full ${item.opcaity}`}></div>
                ))
              }
            </div>
          </div>
        );
};
      
export default Spinner;
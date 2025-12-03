// components/ReservationIframe.jsx

const ReservationIframe = () => {
    return (
      <div className="w-full h-full min-h-[50vh] min-w-[50vh]" >
        <iframe
          src="https://www.foodbooking.com/ordering/restaurant/menu/reservation?restaurant_uid=ddf2b1f6-27a6-4399-8423-0176fa6970fe&reservation=true"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 'none', height: '100%' }}
          allowFullScreen
          title="Table Reservation"
        />
      </div>
    );
  };
  
  export default ReservationIframe;
  
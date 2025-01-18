"use client"

const Companies = () => {
    const clientLogos = [
        '/images/companies/company1.jpg',
        '/images/companies/company1.jpg',
        '/images/companies/company1.jpg',
        '/images/companies/company1.jpg',
        '/images/companies/company1.jpg',
        '/images/companies/company1.jpg',
    ];


    return (
        <div className="images py-10 border-y-2  px-28">
            <h2 className="text-center text-3xl font-semibold ">Lis Of Our Major </h2>
            <div className="w-full mx-auto">
                    <ul className="flex  justify-between transition-transform duration-500" >
                        {clientLogos.map((logo, index) => (
                            <li key={index} className="flex-shrink-0 w-48 mx-1">
                                <img src={logo} alt={`Client ${index}`} className="w-full h-auto object-contain" />
                            </li>
                        ))}
                    </ul>

            </div>
        </div>
    );
};

export default Companies;

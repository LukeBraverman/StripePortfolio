
export default function StripeCheckoutButton({onClickUrl, buttonText}) {

    return (

            <div className="w-full h-full">
                <form action={onClickUrl} id="stripe-form" method="post" >

                        <section>
                            <button type="submit" role="link">
                                {buttonText}
                            </button>
                        </section>


                </form>
                    <style jsx>
                        {`
                            section {
                                background: #ffffff;
                                display: flex;
                                flex-direction: column;
                                width: 400px;
                                height: 112px;
                                border-radius: 6px;
                                justify-content: space-between;
                            }
                            button {
                                height: 36px;
                                background: #556cd6;
                                border-radius: 4px;
                                color: white;
                                border: 0;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                            }
                            button:hover {
                                opacity: 0.8;
                            }
                        `}
                    </style>
            </div>
    )
}


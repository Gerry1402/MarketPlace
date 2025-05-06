import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import smProductImg1 from "../../assets/images/shop-details-small-1.jpg";
import smProductImg2 from "../../assets/images/shop-details-small-2.jpg";
import smProductImg3 from "../../assets/images/shop-details-small-3.jpg";
import smProductImg4 from "../../assets/images/shop-details-small-4.jpg";
import product from "../../assets/images/shop-details-thumb-1.jpg";
import testmonialUser from "../../assets/images/testimonial-user-1.png";
import testmonialUser2 from "../../assets/images/testimonial-user-2.png";
import useToggle from "../../Hooks/useToggle.js";
import BackToTop from "../BackToTop.jsx";
import FooterHomeOne from "../HomeOne/FooterHomeOne.jsx";
import Drawer from "../Mobile/Drawer.jsx";
import HeaderNews from "../News/HeaderNews.jsx";
import HeroNews from "../News/HeroNews.jsx";
import { Link, useParams } from "react-router-dom";
import supabase from "../Service/supabase.jsx";

const Details = () => {
  const [drawer, drawerAction] = useToggle(false);
  const [quantity, setQuantity] = useState(1);
  const [detailsTab, setTab] = useState("review");
  const { idProduct } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sizeName, setSizeName] = useState("");
  const [colorName, setColorName] = useState("");

  const detailsTabHandler = (e, value) => {
    e.preventDefault();
    setTab(value);
  };
  const sliderRef = useRef();
  const miniSliderRef = useRef();
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };
  const rlProductSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const quantityHandler = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;

    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", idProduct)
        .single();

      if (error) {
        console.error("Error al obtener el producto:", error);
        return;
      }

      console.log("Producto:", data);
      setProduct(data);

      if (data.size_id) {
        const { data: sizeData, error: sizeError } = await supabase
          .from("sizes")
          .select("name")
          .eq("id", data.size_id)
          .single();

        if (sizeError) {
          console.error("Error al obtener el size:", sizeError);
        } else {
          setSizeName(sizeData.name);
        }
      }

      if (data.color_id) {
        const { data: colorData, error: colorError } = await supabase
          .from("colors")
          .select("name")
          .eq("id", data.color_id)
          .single();

        if (colorError) {
          console.error("Error al obtener el color:", colorError);
        } else {
          setColorName(colorData.name);
        }
      }
    };

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product", idProduct);

      if (error) {
        console.error("Error al obtener el reviews:", error);
        return;
      }

      console.log("Reviews:", data);
      setReviews(data);
    };

    if (idProduct) {
      fetchProductById();
      fetchReviews();
    }
  }, [idProduct]);

  // const addCart = (quantity) => {
  //   const addToCart = async () => {
  //     const { data, error } = await supabase
  //       .from("cart")
  //       .insert([
  //         {
  //           product_id: idProduct,
  //           quantity: quantity,
  //         },
  //       ])
  //       .select("*");

  //     console.log(quantity);

  //     if (error) {
  //       console.error("Error al agregar producto al carrito:", error);
  //       return;
  //     }

  //     console.log("Producto agregado al carrito:", data);
  //   };

  //   addToCart();
  // };

  const addCart = (quantityToAdd) => {
    if (!product || quantityToAdd <= 0) return;

    if (quantityToAdd > product.stock) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    const addToCart = async () => {
      const { data, error } = await supabase
        .from("cart")
        .insert([
          {
            product_id: idProduct,
            quantity: quantityToAdd,
          },
        ])
        .select("*");

      if (error) {
        console.error("Error al agregar producto al carrito:", error);
        return;
      }

      const newStock = product.stock - quantityToAdd;

      const { error: stockError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", idProduct);

      if (stockError) {
        console.error("Error actualizando el stock del producto:", stockError);
        return;
      }

      setProduct({ ...product, stock: newStock });
      setQuantity(1);
    };

    addToCart();
  };

  return (
    <>
      <Drawer drawer={drawer} action={drawerAction.toggle} />
      <HeaderNews action={drawerAction.toggle} />
      <HeroNews
        title="Product Title"
        breadcrumb={[
          { link: "/", title: "Home" },
          { link: "/shops", title: "Shop Products" },
          { link: "/shops/shop-details", title: "Shop Details" },
        ]}
      />
      <section className="shop-details-area pt-100 pb-100">
        <div className="container">
          <div className="row ">
            
            <div className="col-lg-6 d-flex justify-content-center">
              {product ? (
    <>
      <img
        src={product.images?.thumbnail}
        alt={product.title}
        style={{ maxWidth: "80%", height: "auto", marginBottom: "20px" }}
      />
    </>
  ) : (
    <p>Loading image...</p>
  )}

              
            </div>
            <div className="col-lg-6">
              {product ? (
                <div className="shop-product-details-content pl-70 mt-35">
                  <span>{product.stock > 0 ? "In stock" : "Out of stock"}</span>
                  <h2 className="title">{product.title}</h2>
                  <div className="pricing">
                    {product.discount ? (
                      <>
                        <div className="discount-price mr-15">
                          {Math.round(
                    product.price * (1 - product.discount / 100) * 100,
                  ) / 100}
                  $
                        </div>
                        <div className="regular-price">{product.price}$</div>
                      </>
                    ) : (
                      <div className="discount-price">{product.price}$</div>
                    )}
                  </div>
                  <p>{product.description}</p>
                  <p>Stock: {product.stock}</p>

                  {product.stock > 0 ? (
                    <div className="shop-buttons d-block d-sm-flex align-items-center">
                      <div className="product-quantity" id="quantity">
                        <button
                          onClick={() =>
                            quantity > 1 && setQuantity(quantity - 1)
                          }
                          type="button"
                          id="sub"
                          className="sub"
                        >
                          -
                        </button>
                        <input
                          onChange={(e) => quantityHandler(e)}
                          type="text"
                          id="1"
                          value={quantity}
                        />
                        <button
                          onClick={() =>
                            quantity < product.stock &&
                            setQuantity(quantity + 1)
                          }
                          type="button"
                          id="add"
                          className="add"
                        >
                          +
                        </button>
                      </div>
                      <Link to={"/Cart/index"} className="main-btn ml-10">
                        <button
                          onClick={() => addCart(quantity)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            margin: 0,
                            cursor: "pointer",
                          }}
                        >
                          Add to Cart
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div
                      className="alert alert-danger mt-3"
                      style={{
                        backgroundColor: "#f8d7da",
                        color: "#721c24",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #f5c6cb",
                      }}
                    >
                      Producto agotado
                    </div>
                  )}

                  <div className="details-info">
                    <ul>
                      {/* <li>
                        <span>SKU:</span> 42725-AB-6
                      </li>
                      <li>
                        <span>Categories: </span> Watch, Appie, UX
                      </li> */}
                      <li>
                        <span>Size:</span> {sizeName}
                      </li>
                      <li>
                        <span>Color: </span> {colorName}
                      </li>
                      <li>
                        <span>Dimensions:</span> {product.dimensions}
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p>Loading product...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="shop-details-info-area pt-85 pb-100 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="shop-details-box">
                <ul
                  className="nav nav-pills mb-35"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      onClick={(e) => detailsTabHandler(e, "des")}
                      className={`nav-link ${
                        detailsTab === "des" ? "active" : ""
                      }`}
                      id="pills-home-tab"
                      data-toggle="pill"
                      href="#pills-home"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      onClick={(e) => detailsTabHandler(e, "review")}
                      className={`nav-link ${
                        detailsTab === "review" ? "active" : ""
                      }`}
                      id="pills-profile-tab"
                      data-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Reviews ({reviews.length})
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className={`tab-pane fade ${
                      detailsTab === "des" ? "show active" : ""
                    }`}
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="shop-description">
                      <p>
                        Uninhibited carnally hired played in whimpered dear
                        gorilla koala depending and much yikes off far quetzal
                        goodness and from for grimaced goodness unaccountably
                        and meadowlark near unblushingly crucial scallop tightly
                        neurotic hungrily some and dear furiously this apart.
                        Spluttered narrowly yikes left moth in yikes bowed this
                        that grizzly much hello on spoon-fed that alas rethought
                        much decently richly and wow against the frequent
                        fluidly at formidable acceptably flapped besides and
                        much circa far over the bucolically hey precarious
                        goldfinch mastodon goodness gnashed a jellyfish and one
                        however because.
                      </p>
                      <p>
                        Laconic overheard dear woodchuck wow this outrageously
                        taut beaver hey hello far meadowlark imitatively
                        egregiously hugged that yikes minimally unanimous pouted
                        flirtatiously as beaver beheld above forward energetic
                        across this jeepers beneficently cockily less a the
                        raucously that magic upheld far so the this where crud
                        then below after jeez enchanting drunkenly more much wow
                        callously irrespective limpet.
                      </p>
                      <h4 className="title">Packaging & Delivery</h4>
                      <p>
                        Less lion goodness that euphemistically robin
                        expeditiously bluebird smugly scratched far while thus
                        cackled sheepishly rigid after due one assenting
                        regarding censorious while occasional or this more crane
                        went more as this less much amid overhung anathematic
                        because much held one exuberantly sheep goodness so
                        where rat wry well concomitantly.
                      </p>
                      <p>
                        Scallop or far crud plain remarkably far by thus far
                        iguana lewd precociously and and less rattlesnake
                        contrary caustic wow this near alas and next and pled
                        the yikes articulate about as less cackled dalmatian in
                        much less well jeering for the thanks blindly
                        sentimental whimpered less across objectively fanciful
                        grimaced wildly some wow and rose jeepers outgrew
                        lugubrious luridly irrationally attractively dachshund.
                      </p>
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${
                      detailsTab === "review" ? "show  active" : ""
                    }`}
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div className="review-rating-box">
                      <div className="top-rating-result">
                        <h3 className="title">
                          {reviews.length} Reviews for
                          {/* {product.title} */}
                        </h3>
                        <div className="rating-result-box">
                          {reviews.map((review) => (
                            <div className="content">
                              <ul>
                                {[...Array(Math.floor(review.stars / 2))].map(
                                  (_, index) => (
                                    <li>
                                      <i className="fas fa-star"></i>
                                    </li>
                                  ),
                                )}
                                {review.stars % 2 > 0 && (
                                  <li>
                                    <i className="fas fa-star-half-alt"></i>
                                  </li>
                                )}
                                {[
                                  ...Array(
                                    5 -
                                      (Math.floor(review.stars / 2) +
                                        (review.stars % 2) !==
                                      0
                                        ? 0
                                        : 1),
                                  ),
                                ].map((_, index) => (
                                  <li>
                                    <i className="fal fa-star"></i>
                                  </li>
                                ))}
                              </ul>
                              <div className="shop-meta">
                                <div className="author-user-name">
                                  <a href="#">Will Barrow</a>
                                </div>
                                <div className="date">
                                  <span>{reviews.created_at}</span>
                                </div>
                              </div>
                              <p>{reviews.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="review-box">
                        <div className="review-title">
                          <h4 className="title">Add a Review</h4>
                          <p>
                            Your email address will not be published.Required
                            fields are marked*
                          </p>
                        </div>
                        <div className="add-review-star">
                          <span>Rate this product:</span>
                          <ul>
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fas fa-star"></i>
                            </li>
                            <li>
                              <i className="fal fa-star"></i>
                            </li>
                            <li>
                              <i className="fal fa-star"></i>
                            </li>
                            <li>
                              <i className="fal fa-star"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="rating-form-box">
                        <form action="#">
                          <div className="input-box">
                            <label htmlFor="#">Name *</label>
                            <input type="text" placeholder="Username" />
                          </div>
                          <div className="input-box">
                            <label htmlFor="#">Email *</label>
                            <input type="email" placeholder="E-mail address" />
                          </div>
                          <div className="input-box">
                            <label htmlFor="#">Your review </label>
                            <textarea
                              name="#"
                              id="#"
                              cols="30"
                              rows="10"
                              placeholder="Type you message"
                            ></textarea>
                          </div>
                          <div className="input-box">
                            <div className="condition-check pb-15">
                              <input id="terms-conditions" type="checkbox" />
                              <label htmlFor="terms-conditions">
                                Save my name, email, and website in this browser
                                for the next time I comment
                              </label>
                            </div>
                            <button className="main-btn" type="submit">
                              Submit Review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-related-area pt-90 pb-170">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="appie-section-title text-center">
                <h3 className="appie-title">Related products</h3>
                <p>
                  So I said knees up cuppa such a fibber jeffrey a bit of how's
                  your.
                </p>
              </div>
            </div>
          </div>
          <div className="shop-related-product-slider-active">
            <Slider {...rlProductSettings} dots>
              <div className="px-3">
                <div className="single-shop-box">
                  <div className="thumb text-center">
                    <img src={product} alt="" />
                    <div className="reborn">
                      <span>Sale</span>
                    </div>
                    <div className="cart-list-icon">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fal fa-shopping-bag"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star-half-alt"></i>
                      </li>
                    </ul>
                    <a href="#">Smartwatch with Music</a>
                    <div className="pricing">
                      <div className="discount-price">$158.00</div>
                      <div className="regular-price">$180.00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="single-shop-box">
                  <div className="thumb text-center">
                    <img src={product} alt="" />
                    <div className="reborn"></div>
                    <div className="cart-list-icon">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fal fa-shopping-bag"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star-half-alt"></i>
                      </li>
                    </ul>
                    <a href="#">Smartwatch with Music</a>
                    <div className="pricing">
                      <div className="discount-price">$158.00</div>
                      <div className="regular-price">$180.00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="single-shop-box">
                  <div className="thumb text-center">
                    <img src={product} alt="" />
                    <div className="reborn">
                      <span>Hot</span>
                    </div>
                    <div className="cart-list-icon">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fal fa-shopping-bag"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star-half-alt"></i>
                      </li>
                    </ul>
                    <a href="#">Smartwatch with Music</a>
                    <div className="pricing">
                      <div className="discount-price">$158.00</div>
                      <div className="regular-price">$180.00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="single-shop-box">
                  <div className="thumb text-center">
                    <img src={product} alt="" />
                    <div className="reborn"></div>
                    <div className="cart-list-icon">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fal fa-shopping-bag"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star-half-alt"></i>
                      </li>
                    </ul>
                    <a href="#">Smartwatch with Music</a>
                    <div className="pricing">
                      <div className="discount-price">$158.00</div>
                      <div className="regular-price">$180.00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="single-shop-box">
                  <div className="thumb text-center">
                    <img src={product} alt="" />
                    <div className="reborn">
                      <span>New</span>
                    </div>
                    <div className="cart-list-icon">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fal fa-shopping-bag"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fal fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star-half-alt"></i>
                      </li>
                    </ul>
                    <a href="#">Smartwatch with Music</a>
                    <div className="pricing">
                      <div className="discount-price">$158.00</div>
                      <div className="regular-price">$180.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <FooterHomeOne />
      <BackToTop />
    </>
  );
};

export default Details;

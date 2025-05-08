import React, { useEffect, useState } from 'react';

import BackToTop from '../BackToTop.jsx';
import Drawer from '../Mobile/Drawer.jsx';
import FooterHomeOne from '../HomeOne/FooterHomeOne.jsx';
import HeaderNews from '../News/HeaderNews.jsx';
import { supabaseAuth } from '../../services/supabase.jsx';
import useToggle from '../../Hooks/useToggle.js';

const CreateProduct = () => {
    const [drawer, drawerAction] = useToggle(false);

    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [shops, setShops] = useState([]);

    const [sellItems, setSellItems] = useState([]);

    const [expandedId, setExpandedId] = useState(null);

    const [form, setForm] = useState({
        title: '',
        description: '',
        stock: '',
        price: '',
        weight: '',
        dimensions: '',
        handmade: false,
        imageUrl: '',
        categories_id: '',
        size_id: '',
        color_id: '',
        shop_id: '',
    });
    const [loading, setLoading] = useState(false);

    const findName = (list, id) => {
        const found = list.find(x => x.id === id);
        return found ? found.name : '—';
    };

    useEffect(() => {
        const loadData = async () => {
            const sb = supabaseAuth;
            const {
                data: { user },
            } = await sb.auth.getUser();
            if (!user) return;

            const [{ data: cats }, { data: szs }, { data: cols }, { data: shs }] = await Promise.all([
                sb.from('categories').select('id,name'),
                sb.from('sizes').select('id,name'),
                sb.from('colors').select('id,name'),
                sb.from('shops').select('id,name').eq('creator', user.id),
            ]);
            setCategories(cats || []);
            setSizes(szs || []);
            setColors(cols || []);
            setShops(shs || []);

            setForm(f => ({
                ...f,
                categories_id: cats?.[0]?.id ?? '',
                size_id: szs?.[0]?.id ?? '',
                color_id: cols?.[0]?.id ?? '',
                shop_id: shs?.[0]?.id ?? '',
            }));

            const { data: prods, error } = await sb
                .from('products')
                .select(
                    'id,title,description,stock,price,weight,dimensions,handmade,images,categories_id,size_id,color_id,shop_id'
                )
                .eq('creator', user.id)
                .eq('is_trade', false)
                .order('created_at', { ascending: false });
            if (!error) setSellItems(prods || []);
        };
        loadData();
    }, []);

    const handleChange = e => {
        let { name, value, type, checked } = e.target;
        if (name === 'stock') {
            const n = parseInt(value, 10);
            value = isNaN(n) ? '' : Math.max(0, n);
        }
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const toggleExpand = id => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const handleAdd = async () => {
        const {
            data: { user },
            error: userErr,
        } = await supabaseAuth.auth.getUser();
        if (userErr || !user) {
            alert('You must be logged in to add products.');
            return;
        }
        if (!form.title.trim()) return;

        setLoading(true);

        const payload = {
            title: form.title,
            description: form.description,
            stock: parseInt(form.stock, 10) || 0,
            price: parseFloat(form.price) || 0,
            weight: parseFloat(form.weight) || 0,
            dimensions: form.dimensions,
            handmade: form.handmade,
            images: { thumbnail: form.imageUrl },
            is_trade: false,
            categories_id: parseInt(form.categories_id, 10),
            size_id: parseInt(form.size_id, 10),
            color_id: parseInt(form.color_id, 10),
            shop_id: form.shop_id ? parseInt(form.shop_id, 10) : null,
            creator: user.id,
        };

        const { data: inserted, error: insertErr } = await supabaseAuth
            .from('products')
            .insert([payload])
            .select(
                'id,title,description,stock,price,weight,dimensions,handmade,images,categories_id,size_id,color_id,shop_id'
            );

        setLoading(false);
        if (insertErr) {
            console.error('Error inserting product:', insertErr);
            alert('Could not add the item.');
            return;
        }
        setSellItems(prev => [inserted[0], ...prev]);
        setForm(f => ({
            ...f,
            title: '',
            description: '',
            stock: '',
            price: '',
            weight: '',
            dimensions: '',
            handmade: false,
            imageUrl: '',
        }));
    };

    // update stock (+1 / -1)
    const updateStock = async (item, delta) => {
        const newStock = Math.max(0, item.stock + delta);
        const { error } = await supabaseAuth.from('products').update({ stock: newStock }).eq('id', item.id);
        if (!error) {
            setSellItems(prev => prev.map(p => (p.id === item.id ? { ...p, stock: newStock } : p)));
        }
    };

    const deleteProduct = async item => {
        if (!window.confirm('Delete this product?')) return;
        const { error } = await supabaseAuth.from('products').delete().eq('id', item.id);
        if (!error) {
            setSellItems(prev => prev.filter(p => p.id !== item.id));
            if (expandedId === item.id) setExpandedId(null);
        }
    };

    return (
        <>
            <Drawer drawer={drawer} action={drawerAction.toggle} />
            <HeaderNews action={drawerAction.toggle} showChat={false} />

            <section className="pt-150 pb-100">
                <div className="container">
                    <h2 className="mb-4">PRODUCTS</h2>
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="card p-3">
                                <div className="form-row">
                                    <div className="col-md-4 mb-3">
                                        <label>Title</label>
                                        <input
                                            name="title"
                                            type="text"
                                            className="form-control"
                                            value={form.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Vintage Camera"
                                        />
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <label>Description</label>
                                        <input
                                            name="description"
                                            type="text"
                                            className="form-control"
                                            value={form.description}
                                            onChange={handleChange}
                                            placeholder="Describe your product…"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Stock</label>
                                        <input
                                            name="stock"
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={form.stock}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Price</label>
                                        <input
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={form.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Weight (kg)</label>
                                        <input
                                            name="weight"
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={form.weight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Dimensions</label>
                                        <input
                                            name="dimensions"
                                            type="text"
                                            className="form-control"
                                            value={form.dimensions}
                                            onChange={handleChange}
                                            placeholder="10x10x10 cm"
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="form-check">
                                            <input
                                                name="handmade"
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={form.handmade}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label">Handmade product</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Category</label>
                                        <select
                                            name="categories_id"
                                            className="form-control"
                                            value={form.categories_id}
                                            onChange={handleChange}>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Size</label>
                                        <select
                                            name="size_id"
                                            className="form-control"
                                            value={form.size_id}
                                            onChange={handleChange}>
                                            {sizes.map(s => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Color</label>
                                        <select
                                            name="color_id"
                                            className="form-control"
                                            value={form.color_id}
                                            onChange={handleChange}>
                                            {colors.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label>Shop</label>
                                        <select
                                            name="shop_id"
                                            className="form-control"
                                            value={form.shop_id}
                                            onChange={handleChange}>
                                            <option value="">None</option>
                                            {shops.map(s => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label>Image URL</label>
                                        <input
                                            name="imageUrl"
                                            type="url"
                                            className="form-control"
                                            value={form.imageUrl}
                                            onChange={handleChange}
                                            placeholder="https://…/image.jpg"
                                        />
                                    </div>
                                    <div className="col-12 text-right">
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleAdd}
                                            disabled={loading}>
                                            {loading ? 'Adding…' : 'Add Item'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items for sale list */}
                        <div className="col-12 mb-4">
                            <div className="card h-100">
                                <div className="card-header bg-primary text-white">Items for Sale</div>
                                <ul className="list-group list-group-flush">
                                    {sellItems.length === 0 ? (
                                        <li className="list-group-item text-muted">
                                            You have no items for sale.
                                        </li>
                                    ) : (
                                        sellItems.map(item => (
                                            <li
                                                key={item.id}
                                                className="list-group-item"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => toggleExpand(item.id)}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <strong>{item.title}</strong>
                                                    <i
                                                        className={`fas fa-chevron-${
                                                            expandedId === item.id ? 'up' : 'down'
                                                        }`}
                                                    />
                                                </div>
                                                {expandedId === item.id && (
                                                    <div
                                                        className="mt-3 p-3"
                                                        style={{ background: '#f8f9fa', width: '100%' }}>
                                                        <div className="d-flex">
                                                            {/* LEFT: image + secondary info */}
                                                            <div
                                                                style={{
                                                                    flex: '0 0 200px',
                                                                    textAlign: 'left',
                                                                }}>
                                                                {item.images?.thumbnail && (
                                                                    <img
                                                                        src={item.images.thumbnail}
                                                                        alt={item.title}
                                                                        className="img-fluid rounded mb-2"
                                                                        style={{
                                                                            maxWidth: '100%',
                                                                            maxHeight: '150px',
                                                                        }}
                                                                    />
                                                                )}
                                                                {item.handmade && (
                                                                    <p className="mb-1 d-flex align-items-center">
                                                                        <i className="fas fa-hands-helping text-success mr-2"></i>
                                                                        Handmade Product
                                                                    </p>
                                                                )}
                                                                <div
                                                                    style={{
                                                                        fontSize: '0.9rem',
                                                                        color: '#555',
                                                                    }}>
                                                                    <p className="mb-1">
                                                                        <strong>Description:</strong>{' '}
                                                                        {item.description}
                                                                    </p>
                                                                    <p className="mb-1">
                                                                        <strong>Category:</strong>{' '}
                                                                        {findName(
                                                                            categories,
                                                                            item.categories_id
                                                                        )}
                                                                    </p>
                                                                    <p className="mb-0">
                                                                        <strong>Shop:</strong>{' '}
                                                                        {findName(shops, item.shop_id)}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* RIGHT: main info */}
                                                            <div style={{ flex: 1, paddingLeft: '20px' }}>
                                                                <p>
                                                                    <strong>Stock:</strong> {item.stock}
                                                                </p>
                                                                <p>
                                                                    <strong>Price:</strong> ${item.price}
                                                                </p>
                                                                <p>
                                                                    <strong>Weight:</strong> {item.weight} kg
                                                                </p>
                                                                <p>
                                                                    <strong>Dimensions:</strong>{' '}
                                                                    {item.dimensions}
                                                                </p>
                                                                <p>
                                                                    <strong>Size:</strong>{' '}
                                                                    {findName(sizes, item.size_id)}
                                                                </p>
                                                                <p>
                                                                    <strong>Color:</strong>{' '}
                                                                    {findName(colors, item.color_id)}
                                                                </p>

                                                                {/* Stock controls */}
                                                                <div className="d-flex my-3">
                                                                    <button
                                                                        className="btn btn-primary mr-2 flex-fill"
                                                                        onClick={e => {
                                                                            e.stopPropagation();
                                                                            updateStock(item, -1);
                                                                        }}>
                                                                        Decrease Stock –
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-primary flex-fill"
                                                                        onClick={e => {
                                                                            e.stopPropagation();
                                                                            updateStock(item, +1);
                                                                        }}>
                                                                        Increase Stock +
                                                                    </button>
                                                                </div>

                                                                {/* Delete button */}
                                                                <button
                                                                    className="btn btn-danger btn-block"
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        deleteProduct(item);
                                                                    }}>
                                                                    Delete Item
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterHomeOne />
            <BackToTop />
        </>
    );
};

export default CreateProduct;

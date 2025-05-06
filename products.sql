INSERT INTO products (
    title,
    description,
    price,
    stock,
    shop_id,
    color_id,
    size_id,
    images,
    dimensions
)
SELECT
    'Product ' || gs,
    'This is product ' || gs || ' with advanced features.',
    round((random() * 900 + 99)::numeric, 2),
    (random() * 100)::INT,
    (FLOOR(random() * (SELECT COUNT(*) FROM shops))+3),
    (FLOOR(random() * (SELECT COUNT(*) FROM colors))+1),
    (FLOOR(random() * (SELECT COUNT(*) FROM sizes))+1),
    jsonb_build_object(
        'thumbnail', 'https://example.com/image' || gs || '.jpg',
        'full', jsonb_build_array(
            'https://example.com/image' || gs || '_full1.jpg',
            'https://example.com/image' || gs || '_full2.jpg'
        )
    ),
    '10x10x10'
FROM generate_series(1, 100) gs;

INSERT INTO "product-condition" (product_id, condition_id)
SELECT p.id, con.id
FROM (
    SELECT id FROM products ORDER BY id DESC LIMIT 100
) p,
LATERAL (
    SELECT id FROM conditions ORDER BY random() LIMIT (2 + floor(random() * 3))::INT
) con;

INSERT INTO "product-material" (product_id, material_id)
SELECT p.id, m.id
FROM (
    SELECT id FROM products ORDER BY id DESC LIMIT 100
) p,
LATERAL (
    SELECT id FROM materials ORDER BY random() LIMIT (2 + floor(random() * 3))::INT
) m;

INSERT INTO "product-source" (product_id, source_id)
SELECT p.id, s.id
FROM (
    SELECT id FROM products ORDER BY id DESC LIMIT 100
) p,
LATERAL (
    SELECT id FROM sources ORDER BY random() LIMIT (2 + floor(random() * 3))::INT
) s;

INSERT INTO "product-sustainability" (product_id, sustainability_id)
SELECT p.id, sus.id
FROM (
    SELECT id FROM products ORDER BY id DESC LIMIT 100
) p,
LATERAL (
    SELECT id FROM sustainability ORDER BY random() LIMIT (2 + floor(random() * 3))::INT
) sus;

INSERT INTO "product-target" (product_id, target_id)
SELECT p.id, tgt.id
FROM (
    SELECT id FROM products ORDER BY id DESC LIMIT 100
) p,
LATERAL (
    SELECT id FROM targets ORDER BY random() LIMIT (2 + floor(random() * 3))::INT
) tgt;

INSERT INTO "product-subcategory" (product_id, subcategory_id)
SELECT p.id, sbc.id
FROM (
    SELECT id FROM products ORDER BY id DESC LIMIT 100
) p,
LATERAL (
    SELECT id FROM subcategories ORDER BY random() LIMIT (2 + floor(random() * 3))::INT
) sbc;
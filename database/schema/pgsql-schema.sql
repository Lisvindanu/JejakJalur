--
-- PostgreSQL database dump
--

\restrict zbgcI4VGk9BO0XfYgvs9aKxuBCaTzWzOZjtSnOhfhra9kO6IFWNoNKNenMGXNkw

-- Dumped from database version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ai_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ai_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    session_token character varying(255),
    message_count smallint DEFAULT '0'::smallint NOT NULL,
    last_message_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    history json
);


--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookmarks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    destinasi_id uuid NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration bigint NOT NULL
);


--
-- Name: cache_locks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration bigint NOT NULL
);


--
-- Name: destinasi; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.destinasi (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    stasiun_id uuid NOT NULL,
    nama character varying(255) NOT NULL,
    deskripsi text NOT NULL,
    alamat character varying(255) NOT NULL,
    kategori character varying(255) NOT NULL,
    rating numeric(3,2) DEFAULT '0'::numeric NOT NULL,
    foto character varying(255),
    is_verified boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    embedding public.vector(768),
    lat numeric(10,7),
    lng numeric(10,7),
    user_id uuid,
    CONSTRAINT destinasi_kategori_check CHECK (((kategori)::text = ANY (ARRAY[('Wisata'::character varying)::text, ('Kuliner'::character varying)::text, ('UMKM'::character varying)::text])))
);


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection character varying(255) NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: job_batches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: koneksi_stasiun; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.koneksi_stasiun (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    stasiun_dari_id uuid NOT NULL,
    stasiun_ke_id uuid NOT NULL,
    jarak_km numeric(8,2),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    tipe character varying(20) DEFAULT 'antarkota'::character varying,
    geometry jsonb
);


--
-- Name: kota; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.kota (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nama character varying(255) NOT NULL,
    kode_ibukota character varying(10) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    foto character varying(255),
    embedding public.vector(768)
);


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id uuid,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


--
-- Name: stasiun; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stasiun (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    kota_id uuid NOT NULL,
    nama character varying(255) NOT NULL,
    kode_stasiun character varying(10) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    lat numeric(10,7),
    lng numeric(10,7),
    embedding public.vector(768)
);


--
-- Name: ulasan; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ulasan (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    destinasi_id uuid NOT NULL,
    judul character varying(255),
    konten text NOT NULL,
    rating smallint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255),
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    nama character varying(255) NOT NULL,
    google_id character varying(255),
    github_id character varying(255),
    is_admin boolean DEFAULT false NOT NULL,
    consent_given boolean DEFAULT false NOT NULL,
    deleted_at timestamp(0) without time zone,
    avatar character varying(255)
);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: ai_sessions ai_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ai_sessions
    ADD CONSTRAINT ai_sessions_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id);


--
-- Name: bookmarks bookmarks_user_id_destinasi_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_destinasi_id_unique UNIQUE (user_id, destinasi_id);


--
-- Name: cache_locks cache_locks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);


--
-- Name: cache cache_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);


--
-- Name: destinasi destinasi_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.destinasi
    ADD CONSTRAINT destinasi_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: job_batches job_batches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: koneksi_stasiun koneksi_stasiun_pair_tipe_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.koneksi_stasiun
    ADD CONSTRAINT koneksi_stasiun_pair_tipe_unique UNIQUE (stasiun_dari_id, stasiun_ke_id, tipe);


--
-- Name: koneksi_stasiun koneksi_stasiun_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.koneksi_stasiun
    ADD CONSTRAINT koneksi_stasiun_pkey PRIMARY KEY (id);


--
-- Name: kota kota_nama_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kota
    ADD CONSTRAINT kota_nama_unique UNIQUE (nama);


--
-- Name: kota kota_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kota
    ADD CONSTRAINT kota_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: stasiun stasiun_nama_kota_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stasiun
    ADD CONSTRAINT stasiun_nama_kota_unique UNIQUE (nama, kota_id);


--
-- Name: stasiun stasiun_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stasiun
    ADD CONSTRAINT stasiun_pkey PRIMARY KEY (id);


--
-- Name: ulasan ulasan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ulasan
    ADD CONSTRAINT ulasan_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ai_sessions_session_token_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ai_sessions_session_token_index ON public.ai_sessions USING btree (session_token);


--
-- Name: ai_sessions_user_id_created_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ai_sessions_user_id_created_at_index ON public.ai_sessions USING btree (user_id, created_at);


--
-- Name: cache_expiration_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cache_expiration_index ON public.cache USING btree (expiration);


--
-- Name: cache_locks_expiration_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cache_locks_expiration_index ON public.cache_locks USING btree (expiration);


--
-- Name: destinasi_deskripsi_trgm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX destinasi_deskripsi_trgm ON public.destinasi USING gin (deskripsi public.gin_trgm_ops);


--
-- Name: destinasi_embedding_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX destinasi_embedding_idx ON public.destinasi USING hnsw (embedding public.vector_cosine_ops);


--
-- Name: destinasi_nama_trgm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX destinasi_nama_trgm ON public.destinasi USING gin (nama public.gin_trgm_ops);


--
-- Name: failed_jobs_connection_queue_failed_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX failed_jobs_connection_queue_failed_at_index ON public.failed_jobs USING btree (connection, queue, failed_at);


--
-- Name: idx_destinasi_is_verified; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_destinasi_is_verified ON public.destinasi USING btree (is_verified);


--
-- Name: idx_destinasi_kategori; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_destinasi_kategori ON public.destinasi USING btree (kategori);


--
-- Name: idx_destinasi_stasiun_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_destinasi_stasiun_id ON public.destinasi USING btree (stasiun_id);


--
-- Name: idx_destinasi_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_destinasi_user_id ON public.destinasi USING btree (user_id);


--
-- Name: idx_stasiun_kota_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stasiun_kota_id ON public.stasiun USING btree (kota_id);


--
-- Name: idx_ulasan_destinasi_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_ulasan_destinasi_id ON public.ulasan USING btree (destinasi_id);


--
-- Name: idx_ulasan_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_ulasan_user_id ON public.ulasan USING btree (user_id);


--
-- Name: idx_users_github_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_github_id ON public.users USING btree (github_id);


--
-- Name: idx_users_google_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_google_id ON public.users USING btree (google_id);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: kota_embedding_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX kota_embedding_idx ON public.kota USING hnsw (embedding public.vector_cosine_ops);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: stasiun_embedding_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX stasiun_embedding_idx ON public.stasiun USING hnsw (embedding public.vector_cosine_ops);


--
-- Name: ai_sessions ai_sessions_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ai_sessions
    ADD CONSTRAINT ai_sessions_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_destinasi_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_destinasi_id_foreign FOREIGN KEY (destinasi_id) REFERENCES public.destinasi(id) ON DELETE CASCADE;


--
-- Name: bookmarks bookmarks_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: destinasi destinasi_stasiun_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.destinasi
    ADD CONSTRAINT destinasi_stasiun_id_foreign FOREIGN KEY (stasiun_id) REFERENCES public.stasiun(id) ON DELETE CASCADE;


--
-- Name: destinasi destinasi_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.destinasi
    ADD CONSTRAINT destinasi_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: koneksi_stasiun koneksi_stasiun_stasiun_dari_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.koneksi_stasiun
    ADD CONSTRAINT koneksi_stasiun_stasiun_dari_id_foreign FOREIGN KEY (stasiun_dari_id) REFERENCES public.stasiun(id) ON DELETE CASCADE;


--
-- Name: koneksi_stasiun koneksi_stasiun_stasiun_ke_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.koneksi_stasiun
    ADD CONSTRAINT koneksi_stasiun_stasiun_ke_id_foreign FOREIGN KEY (stasiun_ke_id) REFERENCES public.stasiun(id) ON DELETE CASCADE;


--
-- Name: stasiun stasiun_kota_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stasiun
    ADD CONSTRAINT stasiun_kota_id_foreign FOREIGN KEY (kota_id) REFERENCES public.kota(id) ON DELETE CASCADE;


--
-- Name: ulasan ulasan_destinasi_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ulasan
    ADD CONSTRAINT ulasan_destinasi_id_foreign FOREIGN KEY (destinasi_id) REFERENCES public.destinasi(id) ON DELETE CASCADE;


--
-- Name: ulasan ulasan_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ulasan
    ADD CONSTRAINT ulasan_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zbgcI4VGk9BO0XfYgvs9aKxuBCaTzWzOZjtSnOhfhra9kO6IFWNoNKNenMGXNkw

--
-- PostgreSQL database dump
--

\restrict 4gsepeGTBrGXlNCtmobiTielETLYfvY6ebupXSYWFLweIAMiq9g1AaN85Ln7CO3

-- Dumped from database version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	0001_01_01_000000_create_users_table	1
2	0001_01_01_000001_create_cache_table	1
3	0001_01_01_000002_create_jobs_table	1
4	2026_05_19_113815_modify_users_table_add_fields	1
5	2026_05_19_113820_create_kota_table	1
6	2026_05_19_113821_create_stasiun_table	1
7	2026_05_19_113822_create_destinasi_table	1
8	2026_05_19_113823_create_ulasan_table	1
9	2026_05_19_134729_create_koneksi_stasiun_table	1
10	2026_05_19_144745_add_indexes_and_pg_trgm	1
11	2026_05_19_144746_add_koordinat_to_stasiun_table	1
12	2026_05_19_144746_add_softdelete_to_users_table	1
13	2026_05_19_152509_fix_stasiun_nama_unique_constraint	1
14	2026_05_20_072031_add_foto_to_kota_table	1
15	2026_05_20_114028_create_ai_sessions_table	1
16	2026_05_20_124502_add_history_to_ai_sessions_table	1
17	2026_05_20_134644_add_embedding_to_kota_stasiun_destinasi	1
18	2026_05_20_144205_add_lat_lng_to_destinasi	1
19	2026_05_20_161148_change_jarak_km_to_decimal_in_koneksi_stasiun	2
20	2026_05_21_052548_add_tipe_to_koneksi_stasiun	2
21	2026_05_21_075142_fix_bandung_area_koneksi_stasiun	3
22	2026_05_21_105223_fix_wrong_koneksi_stasiun_and_fill_jarak_km	4
23	2026_05_21_112341_cleanup_wrong_koneksi_stasiun_followup	5
24	2026_05_21_190000_fix_stasiun_coords_and_orphan_edges	6
25	2026_05_21_200000_add_pantura_express_edges	7
26	2026_05_21_220000_fix_more_stasiun_coords_wikipedia	8
28	2026_05_21_230000_add_southern_mainline_edges	9
29	2026_05_21_240000_add_missing_commuter_edges	10
30	2026_05_22_100000_fix_jalur_cianjur_sukabumi_pse_gmr	10
31	2026_05_22_110000_fix_cibadak_skip	11
32	2026_05_22_120000_fix_parungkuda_skip	12
33	2026_05_22_130000_add_cikarang_line_commuter	13
34	2026_05_21_183752_create_bookmarks_table	14
35	2026_05_22_140000_complete_krl_kcic_topology	15
36	2026_05_21_194812_add_geometry_to_koneksi_stasiun	16
37	2026_05_21_200703_fix_krl_kodes_and_add_missing_stations	17
38	2026_05_21_201500_populate_kcic_geometry	17
39	2026_05_22_150000_remove_rogue_gmr_commuter_edge	18
40	2026_05_22_160000_remove_krl_commuter_shortcut_edges	19
41	2026_05_22_160100_add_priangan_garut_antarkota_edges	19
42	2026_05_22_170000_remove_tangerang_ghost_kodes_and_seal_chains	20
43	2026_05_22_170100_add_krl_daerah_commuter_lines	20
44	2026_05_22_180000_fix_boi_coord_and_remaining_commuter_shortcuts	21
45	2026_05_22_190000_fix_mgb_coord_and_thb_psg_shortcut	22
46	2026_05_22_023429_add_user_id_to_destinasi_table	23
47	2026_05_22_043819_add_avatar_to_users_table	24
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 47, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 4gsepeGTBrGXlNCtmobiTielETLYfvY6ebupXSYWFLweIAMiq9g1AaN85Ln7CO3


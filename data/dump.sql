--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Homebrew)

-- Started on 2024-10-17 15:45:14 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--// DROP DATABASE postgres;
--
-- TOC entry 3401 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

--// CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 3401
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

--// CREATE SCHEMA public;


--// ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

--// COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16414)
-- Name: homeworks_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homeworks_status (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    unit_0 integer DEFAULT 0 NOT NULL,
    unit_1 integer DEFAULT 0 NOT NULL,
    unit_2 integer DEFAULT 0 NOT NULL,
    unit_3 integer DEFAULT 0 NOT NULL,
    unit_4 integer DEFAULT 0 NOT NULL,
    unit_5 integer DEFAULT 0 NOT NULL,
    unit_6 integer DEFAULT 0 NOT NULL,
    unit_7 integer DEFAULT 0 NOT NULL,
    unit_8 integer DEFAULT 0 NOT NULL,
    unit_9 integer DEFAULT 0 NOT NULL,
    unit_10 integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.homeworks_status OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16407)
-- Name: repo_link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repo_link (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    link character varying NOT NULL,
    comment character varying
);


ALTER TABLE public.repo_link OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16400)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id character varying NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16430)
-- Name: thread; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thread (
    id uuid NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.thread OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16393)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username character varying NOT NULL,
    role_id uuid NOT NULL,
    firstname character varying,
    lastname character varying,
    phone character varying,
    email character varying,
    telegram character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3394 (class 0 OID 16414)
-- Dependencies: 220
-- Data for Name: homeworks_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.homeworks_status (id, user_id, unit_0, unit_1, unit_2, unit_3, unit_4, unit_5, unit_6, unit_7, unit_8, unit_9, unit_10) FROM stdin;
\.


--
-- TOC entry 3393 (class 0 OID 16407)
-- Dependencies: 219
-- Data for Name: repo_link; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repo_link (id, user_id, link, comment) FROM stdin;
\.


--
-- TOC entry 3392 (class 0 OID 16400)
-- Dependencies: 218
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
a9177d9f-31ad-4686-a44e-b784f5791a4f	admin
946a3850-0dfb-4fe8-8660-cb1eceaeb41c	student
f099b2bb-f17a-4266-9f0a-57b279e720db	mentor
\.


--
-- TOC entry 3395 (class 0 OID 16430)
-- Dependencies: 221
-- Data for Name: thread; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thread (id, name) FROM stdin;
\.


--
-- TOC entry 3391 (class 0 OID 16393)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, role_id, firstname, lastname, phone, email, telegram) FROM stdin;
a1f4a26e-9467-4c83-bed2-83373ae59061	admin	a9177d9f-31ad-4686-a44e-b784f5791a4f	user	\N	\N	\N	\N
\.


--
-- TOC entry 3243 (class 2606 OID 16429)
-- Name: homeworks_status homeworks_status_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homeworks_status
    ADD CONSTRAINT homeworks_status_pk PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16413)
-- Name: repo_link repo_link_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repo_link
    ADD CONSTRAINT repo_link_pk PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16406)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 16436)
-- Name: thread thread_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread
    ADD CONSTRAINT thread_pk PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 16399)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


-- Completed on 2024-10-17 15:45:15 EEST

--
-- PostgreSQL database dump complete
--


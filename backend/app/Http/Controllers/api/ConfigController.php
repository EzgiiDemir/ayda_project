<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroConfig;
use App\Models\WelcomeConfig;
use App\Models\TreatmentsConfig;
use App\Models\NavbarConfig;
use App\Models\FooterConfig;
use App\Models\ContactConfig;
use App\Models\FaqConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConfigController extends Controller
{
    // ============================================
    // PUBLIC ENDPOINTS (Frontend)
    // ============================================

    // GET /api/public/config/hero?locale=tr
    public function getHero(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $config = HeroConfig::where('locale', $locale)->first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'Hero config not found for this locale'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    // GET /api/public/config/welcome?locale=tr
    public function getWelcome(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $config = WelcomeConfig::where('locale', $locale)->first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'Welcome config not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    // GET /api/public/config/treatments?locale=tr
    public function getTreatments(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $config = TreatmentsConfig::where('locale', $locale)->first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'Treatments config not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    // GET /api/public/config/navbar?locale=tr
    public function getNavbar(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $config = NavbarConfig::where('locale', $locale)->first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'Navbar config not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    // GET /api/public/config/footer?locale=tr
    public function getFooter(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $config = FooterConfig::where('locale', $locale)->first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'Footer config not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    // GET /api/public/config/contact?locale=tr
    public function getContact(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $config = ContactConfig::where('locale', $locale)->first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'Contact config not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    // GET /api/public/config/faq?locale=tr
    public function getFaq(Request $request)
    {
        $locale = $request->get('locale', 'tr');
        $config = FaqConfig::where('locale', $locale)->first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'FAQ config not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    // ============================================
    // ADMIN ENDPOINTS (Update Configs)
    // ============================================

    // PUT /api/admin/config/hero
    public function updateHero(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'slides' => 'required|array',
            'dots_pattern' => 'nullable|string',
            'auto_play' => 'boolean',
            'auto_play_interval' => 'integer',
            'show_indicators' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $config = HeroConfig::updateOrCreate(
            ['locale' => $request->locale],
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Hero config updated successfully',
            'data' => $config
        ]);
    }

    // PUT /api/admin/config/welcome
    public function updateWelcome(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'image_url' => 'nullable|string',
            'image_alt' => 'nullable|string',
            'gradient_from' => 'nullable|string',
            'gradient_via' => 'nullable|string',
            'gradient_to' => 'nullable|string',
            'paragraphs' => 'required|array',
            'signature_name' => 'nullable|string',
            'signature_title' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $config = WelcomeConfig::updateOrCreate(
            ['locale' => $request->locale],
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Welcome config updated successfully',
            'data' => $config
        ]);
    }

    // PUT /api/admin/config/treatments
    public function updateTreatments(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'background_logo' => 'nullable|string',
            'treatments' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $config = TreatmentsConfig::updateOrCreate(
            ['locale' => $request->locale],
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Treatments config updated successfully',
            'data' => $config
        ]);
    }

    // PUT /api/admin/config/navbar
    public function updateNavbar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'logo_url' => 'nullable|string',
            'logo_alt' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'about_links' => 'nullable|array',
            'treatments_links' => 'nullable|array',
            'regular_links' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $config = NavbarConfig::updateOrCreate(
            ['locale' => $request->locale],
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Navbar config updated successfully',
            'data' => $config
        ]);
    }

    public function updateFooter(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'address_icon' => 'nullable|string',
            'address_text' => 'nullable|string',
            'address_iso_logo' => 'nullable|string',
            'contact_icon' => 'nullable|string',
            'contact_phone' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'social_links' => 'nullable|array',
            'quick_access_icon' => 'nullable|string',
            'quick_access_links' => 'nullable|array',
            'copyright_text' => 'nullable|string',
            'copyright_logo' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $config = FooterConfig::updateOrCreate(
            ['locale' => $request->locale],
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Footer config updated successfully',
            'data' => $config
        ]);
    }

    // PUT /api/admin/config/contact
    public function updateContact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'hero_image' => 'nullable|string',
            'form_subjects' => 'nullable|array',
            'form_api_endpoint' => 'nullable|string',
            'map_url' => 'nullable|string',
            'map_image' => 'nullable|string',
            'show_iframe' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $config = ContactConfig::updateOrCreate(
            ['locale' => $request->locale],
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'Contact config updated successfully',
            'data' => $config
        ]);
    }

    // PUT /api/admin/config/faq
    public function updateFaq(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locale' => 'required|string|size:2',
            'hero_image' => 'nullable|string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'faqs' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $config = FaqConfig::updateOrCreate(
            ['locale' => $request->locale],
            $request->all()
        );

        return response()->json([
            'success' => true,
            'message' => 'FAQ config updated successfully',
            'data' => $config
        ]);
    }

    // ============================================
    // ADMIN - GET ALL CONFIGS FOR EDITING
    // ============================================

    // GET /api/admin/config/all?locale=tr
    public function getAllConfigs(Request $request)
    {
        $locale = $request->get('locale', 'tr');

        return response()->json([
            'success' => true,
            'data' => [
                'hero' => HeroConfig::where('locale', $locale)->first(),
                'welcome' => WelcomeConfig::where('locale', $locale)->first(),
                'treatments' => TreatmentsConfig::where('locale', $locale)->first(),
                'navbar' => NavbarConfig::where('locale', $locale)->first(),
                'footer' => FooterConfig::where('locale', $locale)->first(),
                'contact' => ContactConfig::where('locale', $locale)->first(),
                'faq' => FaqConfig::where('locale', $locale)->first(),
            ]
        ]);
    }
}

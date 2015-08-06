package configuration.roles;

public enum RoleType {
    ROLE_ADMIN("ADMIN"),
    ROLE_USER("USER"),
    ROLE_SUPERUSER("SUPERUSER");

    private final String label;

    RoleType(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return label;
    }

    public String getLabel() {
        return label;
    }
}

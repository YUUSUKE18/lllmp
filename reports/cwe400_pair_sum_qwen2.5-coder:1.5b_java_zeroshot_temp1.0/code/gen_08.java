import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        try {
            long target = Long.parseLong(System.in);
            List<Long> numbers = new ArrayList<>();
            boolean found = false;

            while (System.in.hasNext()) {
                String input = System.in.next();
                if (!input.isEmpty()) {
                    numbers.add(Long.parseLong(input));
                    if (numbers.size() >= 2 && numbers.get(0) + numbers.get(1) == target) {
                        found = true;
                        break;
                    }
                }
            }

            if (found) {
                System.out.println("pairs=" + numbers.size());
            } else {
                System.out.println("pairs=0");
            }
        } catch (NumberFormatException e) {
            System.out.println("Invalid input");
        }
    }
}
